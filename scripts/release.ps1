param(
  [Parameter(Mandatory = $true)]
  [string]$Version
)

$ErrorActionPreference = 'Stop'

$normalizedVersion = $Version.Trim()
if ($normalizedVersion.StartsWith('v')) {
  $normalizedVersion = $normalizedVersion.Substring(1)
}

if ($normalizedVersion -notmatch '^\d+\.\d+\.\d+$') {
  throw "Version must use semantic version format, for example 1.2.3 or v1.2.3"
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$changelogPath = Join-Path $repoRoot 'CHANGELOG.md'

if (-not (Test-Path $changelogPath)) {
  throw "CHANGELOG.md not found at $changelogPath"
}

$content = Get-Content $changelogPath -Raw
$releaseDate = Get-Date -Format 'yyyy-MM-dd'
$unreleasedHeader = '## [Unreleased]'
$newReleaseHeader = "## [$normalizedVersion] - $releaseDate"

if ($content -notmatch [regex]::Escape($unreleasedHeader)) {
  throw "CHANGELOG.md does not contain an Unreleased section"
}

if ($content -match "(?m)^## \[$([regex]::Escape($normalizedVersion))\]") {
  throw "CHANGELOG.md already contains version $normalizedVersion"
}

$template = "$unreleasedHeader`r`n`r`n### Added`r`n- `r`n`r`n### Changed`r`n- `r`n`r`n### Fixed`r`n- `r`n`r`n$newReleaseHeader"
$updatedContent = $content -replace [regex]::Escape($unreleasedHeader), $template
Set-Content -Path $changelogPath -Value $updatedContent -Encoding utf8

& (Join-Path $PSScriptRoot 'update-version-json.ps1') -Version $normalizedVersion

Write-Host "Prepared CHANGELOG.md for release v$normalizedVersion on $releaseDate"
Write-Host "Next steps:"
Write-Host "  1. Fill in the release notes under [$normalizedVersion]"
Write-Host "  2. Commit your changes"
Write-Host "  3. Create and push the tag: git tag v$normalizedVersion && git push origin v$normalizedVersion"
