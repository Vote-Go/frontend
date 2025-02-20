export default function Footer() {
	return (
		<footer className="bg-black text-white border-t border-gray-800">
			<div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
				<div className="flex items-end">
					<span className="text-alt text-xl font-bold tracking-tighter">
						Vote<span className="text-secondary mx-2">&</span>Go
					</span>
					<span className="ml-4 text-gray-400 text-sm">
						© {new Date().getFullYear()} All rights reserved
					</span>
				</div>

				<SocialLinks />
			</div>
		</footer>
	);
}

const SocialLinks = () => (
	<div className="sm:ml-auto sm:mt-0 mt-4 flex space-x-4">
		<SocialIcon
			href="https://twitter.com"
			icon="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
		/>
		<SocialIcon
			href="https://discord.com"
			icon="M20 5.9c-.7.3-1.5.5-2.4.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1-.7-.8-1.8-1.3-3-1.3-2.3 0-4.1 1.8-4.1 4v.4c-3.5 0-6.6-1.8-8.6-4.5-.4.7-.6 1.5-.6 2.4 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.8 3.7 2.8-1.4 1.1-3.1 1.8-5 1.8H4c1.8 1.1 3.9 1.8 6.1 1.8 7.3 0 11.3-6 11.3-11.3v-.5c.8-.6 1.5-1.3 2-2.1z"
		/>
	</div>
);

const SocialIcon = ({ href, icon }) => (
	<a href={href} className="text-gray-400 hover:text-white transition-colors">
		<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
			<path d={icon} />
		</svg>
	</a>
);
