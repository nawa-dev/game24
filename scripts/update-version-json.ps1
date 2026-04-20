param(
  [string]$Version
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$versionJsonPath = Join-Path $repoRoot 'data/version.json'

$currentVersion = $null
if (Test-Path $versionJsonPath) {
  try {
    $current = Get-Content $versionJsonPath -Raw | ConvertFrom-Json
    if ($current.version) {
      $currentVersion = [string]$current.version
    }
  } catch {
    $currentVersion = $null
  }
}

$normalizedVersion = $Version
if ([string]::IsNullOrWhiteSpace($normalizedVersion)) {
  $normalizedVersion = $currentVersion
}

if ([string]::IsNullOrWhiteSpace($normalizedVersion)) {
  $normalizedVersion = '0.1.0'
}

if ($normalizedVersion.StartsWith('v')) {
  $normalizedVersion = $normalizedVersion.Substring(1)
}

$hash = (git rev-parse --short HEAD).Trim()
$date = (git log -1 --date=format-local:'%Y-%m-%d %H:%M' --format='%cd').Trim()

$payload = [ordered]@{
  version = $normalizedVersion
  hash = $hash
  date = $date
}

$json = $payload | ConvertTo-Json
Set-Content -Path $versionJsonPath -Value $json -Encoding utf8

Write-Host "Updated data/version.json to version $normalizedVersion ($hash at $date)"
