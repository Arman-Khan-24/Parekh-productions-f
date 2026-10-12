export function WhatsAppButton() {
  const whatsappNumber = "918657754937";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Parekh Productions! I'd like to inquire about your event production & media services."
  )}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Parekh Productions"
        className="group relative flex h-16 w-16 sm:h-[68px] sm:w-[68px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:bg-[#20ba5a] hover:scale-105 active:scale-95"
      >
        {/* Clean Official WhatsApp SVG Logo (Enlarged ~25-30% for distinct responsive readability) */}
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8 sm:h-9 sm:w-9 fill-current transition-transform duration-300 group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.65.736 5.128 2.015 7.247L2.44 29.56l6.504-1.542A13.92 13.92 0 0 0 16.002 30c7.72 0 14-6.28 14-13.998C30.002 8.28 23.722 2 16.002 2zm8.172 19.866c-.34.96-1.684 1.76-2.756 1.993-.733.158-1.69.285-4.912-1.05-4.12-1.706-6.776-5.882-6.982-6.155-.205-.274-1.674-2.228-1.674-4.25 0-2.022 1.058-3.018 1.434-3.43.376-.412.822-.515 1.096-.515.274 0 .548.003.788.014.254.012.593-.096.927.708.343.824 1.166 2.846 1.268 3.052.103.206.172.447.034.72-.137.274-.206.446-.412.686-.206.24-.433.536-.618.72-.206.206-.42.43-.18.842.24.412 1.069 1.764 2.296 2.857 1.58 1.408 2.913 1.844 3.325 2.05.412.206.652.172.892-.103.24-.275 1.03-1.2 1.304-1.613.274-.412.548-.343.927-.206.377.137 2.398 1.132 2.81 1.338.412.206.686.309.788.48.103.172.103 1.0-.237 1.956z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3.5 hidden rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 sm:inline-block shadow-md">
          WhatsApp Direct
        </span>
      </a>
    </aside>
  );
}
