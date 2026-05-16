import Link from "next/link";

export default function AdminPagesDashboard() {
  const pages = [
    { title: "Home Page", path: "/admin/pages/home", description: "Edit hero stories, featured updates, and mission statement." },
    { title: "In the News", path: "/admin/pages/news", description: "Edit header copy and UI labels for the news section." },
    { title: "Editorial", path: "/admin/pages/editorial", description: "Edit featured editorial, sidebar links, and page labels." },
    { title: "Contact", path: "/admin/pages/contact", description: "Edit contact information, social links, and form labels." },
    { title: "About Us", path: "/admin/pages/about", description: "Edit organization story, mission, vision, and team info." },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-sans font-bold text-black mb-2">Site Pages</h1>
      <p className="text-zinc-500 mb-8 text-sm">Select a page below to edit its dynamic content and labels.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map(page => (
          <Link href={page.path} key={page.path} className="flex flex-col border border-zinc-200 bg-white rounded-sm p-6 hover:border-black transition-colors group">
            <h2 className="text-lg font-bold text-black mb-2">{page.title}</h2>
            <p className="text-sm text-zinc-600 flex-1">{page.description}</p>
            <span className="inline-block mt-4 text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-black transition-colors">Edit Page →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
