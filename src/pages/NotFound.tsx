import { Hero } from "../widgets/hero";
import { Container } from "../shared/ui/Container";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Container>
      <Hero
        title="Ooopss.. 404 Error!"
        subtitle="Seems like this page does not exist:("
      />
      <div className="returnHome flex justify-center">
        <Link to="/" className="text text-xl sm:text-3xl underline">
          Go back to Vote & Go!
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
