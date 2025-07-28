import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-white/60">
          © 2025 YourNFTPlatform. All rights reserved.
        </p>
        <div className="flex gap-10">
          <SocialIcon url="https://x.com/nilu9102" />
          <SocialIcon url="https://github.com/nilu912" />
          <SocialIcon url="https://www.linkedin.com/in/nilu912/" />
        </div>
      </div>
    </footer>
  );
}
