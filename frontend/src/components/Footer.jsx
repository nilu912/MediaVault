import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-white/60">© 2025 YourNFTPlatform. All rights reserved.</p>

        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
