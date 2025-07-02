{
  description = "Vortex DEX - A modern decentralized exchange platform";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            pnpm
            git
          ];

          shellHook = ''
            echo "🌪️  Welcome to Vortex DEX Development Environment"
            echo "📦 Node.js: $(node --version)"
            echo "📦 pnpm: $(pnpm --version)"
            echo ""
            echo "🚀 Quick start:"
            echo "  pnpm install    # Install dependencies"
            echo "  pnpm dev        # Start development server"
            echo ""
          '';
        };
      }
    );
} 