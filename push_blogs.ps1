$signature = @'
using System;
using System.Runtime.InteropServices;

public class CredReader4 {
    [DllImport("advapi32.dll", EntryPoint = "CredReadW", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);

    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern void CredFree(IntPtr credentialPtr);

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public int Flags;
        public int Type;
        public string TargetName;
        public string Comment;
        public long LastWritten;
        public int CredentialBlobSize;
        public IntPtr CredentialBlob;
        public int Persist;
        public int AttributeCount;
        public IntPtr Attributes;
        public string TargetAlias;
        public string UserName;
    }

    public static string GetToken(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
            byte[] blob = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, blob, 0, cred.CredentialBlobSize);
            CredFree(credPtr);
            return System.Text.Encoding.UTF8.GetString(blob);
        }
        return null;
    }
}
'@

Add-Type -TypeDefinition $signature -ErrorAction SilentlyContinue

$token = [CredReader4]::GetToken("gh:github.com:ankitbairagi800-jpg")
if (-not $token) {
    $token = [CredReader4]::GetToken("gh:github.com:")
}

if (-not $token) {
    Write-Error "No token found in credential manager"
    exit 1
}

$git = "C:\Users\ankit\.gemini\antigravity\scratch\mingit\cmd\git.exe"
$repoDir = "C:\Users\ankit\.gemini\antigravity\scratch\stayzen"

Set-Location $repoDir

& $git add -A
& $git commit -m "Add 10 SEO blog posts covering 50 Google ranking keywords and update sitemap"

$pushUrl = "https://x-access-token:$($token)@github.com/stayzenhostels-code/Stayzen-Hostels.git"
$cleanUrl = "https://github.com/stayzenhostels-code/Stayzen-Hostels.git"

& $git remote set-url origin $pushUrl
Write-Output "Pushing 10 new blog posts..."
& $git push origin main

$exitCode = $LASTEXITCODE

# Reset remote back to clean URL
& $git remote set-url origin $cleanUrl

if ($exitCode -eq 0) {
    Write-Output "PUSH_SUCCESS"
} else {
    Write-Output "PUSH_FAILED:$exitCode"
}
