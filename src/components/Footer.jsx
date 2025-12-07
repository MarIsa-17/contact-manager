import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="p-4 bg-indigo-300/40 mt-8 w-full text-center">
      <h3 className="text-base font-medium">Isabel Nuñez López</h3>
      <div className="flex flex-row justify-center gap-4">
        <p>📱 Teléfono: +51 987682671</p>
        <p>/</p>
        <p>✉️ Email: marisa@email.com</p>
      </div>

      <Copyright name="Isabel Nuñez López" />
    </footer>
  );
}
