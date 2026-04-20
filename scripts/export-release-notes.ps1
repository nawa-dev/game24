param(
  [Parameter(Mandatory = $true)]
  [string]$Version,

  [string]$OutputPath = 'release-notes.md'
)

$ErrorActionPreference = 'Stop'

$normalizedVersion = $Version.Trim()
if ($normalizedVersion.StartsWith('v')) {
  $normalizedVersion = $normalizedVersion.Substring(1)
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$changelogPath = Join-Path $repoRoot 'CHANGELOG.md'

if (-not (Test-Path $changelogPath)) {
  throw "CHANGELOG.md not found at $changelogPath"
}

$content = Get-Content $changelogPath -Raw
$pattern = "(?ms)^## \[$([regex]::Escape($normalizedVersion))\] - .+?\r?\n\r?\n(.*?)(?=^## \[|\z)"
$match = [regex]::Match($content, $pattern)

if (-not $match.Success) {
  throw "Could not find release notes for version $normalizedVersion in CHANGELOG.md"
}

$notes = $match.Groups[1].Value.Trim()
if ([string]::IsNullOrWhiteSpace($notes)) {
  throw "Release notes for version $normalizedVersion are empty in CHANGELOG.md"
}

Set-Content -Path $OutputPath -Value $notes -Encoding utf8
Write-Host "Exported release notes for version $normalizedVersion to $OutputPath"
