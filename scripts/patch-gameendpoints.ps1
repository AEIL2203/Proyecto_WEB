$ErrorActionPreference = 'Stop'
$path = "c:\\Users\\angel\\OneDrive\\Documentos\\GitHub\\Proyecto_WEB\\api\\GameEndpoints.cs"

# Backup
Copy-Item -Path $path -Destination ($path + '.bak') -Force

# Read file
$content = Get-Content -Path $path -Raw

# 1) Ensure score endpoint (service-based) exists; if not, insert after the section comment
$scorePattern = [regex]::Escape("g.MapPost(\"/games/{id:int}/score\"")
if (-not ([regex]::IsMatch($content, $scorePattern))) {
    $insertAfter = "// ===== Score / Foul / Undo ====="
    $scoreBlock = @'
g.MapPost("/games/{id:int}/score", async ([FromServices] IGameService svc, int id, [FromBody] ScoreDto b) =>
{
    var res = await svc.ScoreAsync(id, b.Team, b.Points, b.PlayerNumber, b.PlayerId);
    return res.Ok ? Results.NoContent() : Results.BadRequest(new { error = res.Error });
}).WithOpenApi();
'@
    $content = $content -replace [regex]::Escape($insertAfter), ($insertAfter + "`r`n        " + $scoreBlock)
}

# 2) Replace remove-score block with service-based version
$removeScoreRegex = 'g\.MapPost\("/games/\{id:int\}/remove-score",[\s\S]*?\)\.WithOpenApi\(\);'
$removeScoreReplacement = @'g.MapPost("/games/{id:int}/remove-score", async ([FromServices] IGameService svc, int id, [FromBody] ScoreDto b) =>
        {
            var res = await svc.RemoveScoreAsync(id, b.Team);
            return res.Ok ? Results.NoContent() : Results.BadRequest(new { error = res.Error });
        }).WithOpenApi();
'@
$content = [regex]::Replace($content, $removeScoreRegex, $removeScoreReplacement)

# 3) Remove duplicate SQL-based undo block (signature async (int id) => ...)
$undoSqlRegex = 'g\.MapPost\("/games/\{id:int\}/undo",\s*async\s*\(int id\)\s*=>[\s\S]*?\)\.WithOpenApi\(\);'
$content = [regex]::Replace($content, $undoSqlRegex, '')

# Write back
Set-Content -Path $path -Value $content -Encoding UTF8
Write-Output "Patched GameEndpoints.cs (backup created as GameEndpoints.cs.bak)"
