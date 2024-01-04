$author = "EarlTheUnicorn"
$folders = @(("./app/chat/[id]", "./components/ChatBox", "./pages/api/dbAccess/endpoint", "./components/ChatInput", "./components/ChatResponse"))
$since = "2023-11-01"
$until = "2023-11-15"

foreach ($folder in $folders) {
    $files = Get-ChildItem -Path $folder
    foreach ($file in $files) {
        if (-not $file.PSIsContainer) {
            $blame = git blame --since=$since --until=$until $file.FullName
            if ($blame -match $author) {
                Write-Output $blame
            }
        }
    }
}