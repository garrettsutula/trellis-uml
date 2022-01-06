export default `{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
      {
          "name": "Debug Trellis Build",
          "type": "node",
          "request": "launch",
          "cwd": "\${workspaceFolder}",
          "runtimeExecutable": "npx",
          "runtimeArgs": [ "trellis", "build", "--inspect"],
          "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
          "resolveSourceMapLocations": [
              "\${workspaceFolder}/dist/**/*.js",
              "\${workspaceFolder}/node_modules/trellisuml/**/*.js",
          ]
        }
  ]
}`;
