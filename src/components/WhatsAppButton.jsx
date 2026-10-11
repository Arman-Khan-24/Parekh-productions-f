export function WhatsAppButton() {
  const whatsappNumber = "918657754937";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Parekh Productions! I'd like to inquire about your event production & media services."
  )}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Parekh Productions"
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 active:scale-95"
      >
        {/* Radar pulse effect */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {/* Official WhatsApp SVG Logo */}
        <svg
          viewBox="0 0 32 32"
          className="relative h-7 w-7 sm:h-8 sm:w-8 fill-current transition-transform duration-300 group-hover:rotate-6"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.65.736 5.128 2.015 7.247L2.44 29.56l6.504-1.542A13.92 13.92 0 0 0 16.002 30c7.72 0 14-6.28 14-13.998C30.002 8.28 23.722 2 16.002 2zm8.172 19.866c-.34.96-1.684 1.76-2.756 1.993-.733.158-1.69.285-4.912-1.05-4.12-1.706-6.776-5.882-6.982-6.155-.205-.274-1.674-2.228-1.674-4.25 0-2.022 1.058-3.018 1.434-3.43.376-.412.822-.515 1.096-.515.274 0 .548.003.788.014.254.012.593-.096.927.708.343.824 1.166 2.846 1.268 3.052.103.206.172.447.034.72-.137.274-.206.446-.412.686-.206.24-.433.536-.618.72-.206.206-.42.43-.18.842.24.412 1.069 1.764 2.296 2.857 1.58 1.408 2.913 1.844 3.325 2.05.412.206.652.172.892-.103.24-.275 1.03-1.2 1.304-1.613.274-.412.548-.343.927-.206.377.137 2.398 1.132 2.81 1.338.412.206.686.309.788.48.103.172.103 1.0-.237 1.956z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-xl bg-[#1a1a1e] px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:inline-block">
          Chat with us on WhatsApp
        </span>
      </a>
    </aside>
  );
}
