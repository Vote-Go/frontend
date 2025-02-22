import { DeveloperGrid } from "../../features/team/ui/DeveloperGrid";
import { Container } from "../../shared/ui/Container";

export const TeamSection = () => (
	<Container>
		<div className="container mx-auto px-4">
			<h2 className="!text-3xl font-bold text-center mb-12 title">
				Our Core Team
			</h2>
			<DeveloperGrid />
		</div>
	</Container>
);
