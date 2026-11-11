#Requires -Version 5.1
<#
.SYNOPSIS
  Puerta SDD para BusTrack Landing: plantilla + specs (NN-slug) con Estado, Aprobación, plan/task/chart y checklists.
#>
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$failed = $false

function Fail([string]$message) {
  Write-Output "SDD-FAIL: $message"
  $script:failed = $true
}

if (-not (Test-Path -LiteralPath (Join-Path $root "specs/templates/spec-template.md"))) {
  Fail "Falta specs/templates/spec-template.md"
}

$specs = Get-ChildItem -LiteralPath (Join-Path $root "specs") -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -match '^\d{2}-' }
if (-not $specs) { Fail "sin carpetas NN-slug en specs/" }

foreach ($s in $specs) {
  $spec = Join-Path $s.FullName "spec.md"
  if (-not (Test-Path -LiteralPath $spec)) { Fail "$($s.Name) sin spec.md"; continue }
  $t = Get-Content -LiteralPath $spec -Raw
  if ($t -notmatch "Estado:") { Fail "$($s.Name) sin Estado:" }
  if ($t -notmatch "## Aprobaci") { Fail "$($s.Name) sin bloque de Aprobación" }
  foreach ($req in @("plan.md", "task.md", "chart.md")) {
    if (-not (Test-Path -LiteralPath (Join-Path $s.FullName $req))) { Fail "$($s.Name) sin $req" }
  }
  if (-not (Test-Path -LiteralPath (Join-Path $s.FullName "checklists"))) { Fail "$($s.Name) sin checklists/" }
}

$endpointSpecs = Get-ChildItem -LiteralPath (Join-Path $root "specs-endpoints") -Directory -ErrorAction SilentlyContinue
foreach ($es in $endpointSpecs) {
  $esFile = Join-Path $es.FullName "spec.md"
  if (-not (Test-Path -LiteralPath $esFile)) { Fail "specs-endpoints/$($es.Name) sin spec.md"; continue }
  $esText = Get-Content -LiteralPath $esFile -Raw
  if ($esText -notmatch "Estado:") { Fail "specs-endpoints/$($es.Name) sin Estado:" }
  if ($esText -notmatch "## Aprobaci") { Fail "specs-endpoints/$($es.Name) sin bloque de Aprobación" }
}

if ($failed) { Write-Output "SDD-FAIL"; exit 1 }
Write-Output "SDD-OK"
