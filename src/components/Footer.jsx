import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="p-1.5 bg-blue-300/20 mt-8 w-full text-center ">
      <div className="flex flex-row text-xs justify-center gap-3 items-center text-white/30">
        <h3>Isabel Nuñez López</h3>
        <p>/</p>
        <p>📱 Teléfono: +51 987682671</p>
        <p>/</p>
        <p>✉️ Email: marisa@email.com</p>
      </div>

      <Copyright name="Isabel Nuñez López" />
    </footer>
  );
}
