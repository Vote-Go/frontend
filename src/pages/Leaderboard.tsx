import { Hero } from "../widgets/hero";
import { Container } from "../shared/ui/Container";
import { BiSortAlt2 } from "react-icons/bi";
import { useState, useEffect } from "react";

interface tableRows {
  name: string;
  rating: number;
  score: number;
}

const generateTable = () => {
  const tableHeaders = ["№", "Name", "Rating", "Score"];
  const tableRows: tableRows[] = [
    {
      name: "Marat",
      rating: 4.5,
      score: 50,
    },
    {
      name: "Alexei",
      rating: 4.8,
      score: 25,
    },
    {
      name: "Egor",
      rating: 5,
      score: 60,
    },
    {
      name: "Nikita",
      rating: 4.9,
      score: 35,
    },
    {
      name: "Daniil",
      rating: 5,
      score: 52,
    },
    {
      name: "Marat2",
      rating: 1.5,
      score: 50,
    },
    {
      name: "Alexei2",
      rating: 4.6,
      score: 25,
    },
    {
      name: "Egor2",
      rating: 2.5,
      score: 60,
    },
    {
      name: "Nikita2",
      rating: 3.9,
      score: 35,
    },
    {
      name: "Daniil2",
      rating: 3,
      score: 522,
    },
  ];

  const [tableData, setTableData] = useState(tableRows);
  const [sortByScoreType, setByScoreType] = useState("descending"); // sorts by descending by default
  const [sortByRatingType, setByRatingType] = useState("descending"); // sorts by descending by default

  // sort the table by score in descending order once the page loads
  useEffect(() => {
    setTableData([...tableData].sort((a, b) => b.score - a.score));
  }, []);

  const sortByScore = () => {
    let sortedScore;
    if (sortByScoreType == "descending") {
      setByScoreType("ascending");
      sortedScore = [...tableData].sort((a, b) => a.score - b.score);
    } else {
      setByScoreType("descending");
      sortedScore = [...tableData].sort((a, b) => b.score - a.score);
    }
    setTableData(sortedScore);
  };

  const sortByRating = () => {
    let sortedRating;
    if (sortByRatingType == "descending") {
      setByRatingType("ascending");
      sortedRating = [...tableData].sort((a, b) => a.rating - b.rating);
    } else {
      setByRatingType("descending");
      sortedRating = [...tableData].sort((a, b) => b.rating - a.rating);
    }
    setTableData(sortedRating);
  };

  return (
    <div className="dark:bg-white bg-black rounded-md lg:w-3/4 mx-auto border-gray-800/50 dark:border-gray-300 border-1">
      <div className="relative w-full overflow-auto ">
        <table className="w-full  group table-fixed ">
          <thead className="[&_tr]:border-b [&_tr]:border-gray-800/50 dark:[&_tr]:border-gray-300 hover:bg-gray-900/40 dark:hover:bg-gray-200/50">
            <tr>
              {tableHeaders.map((header) => {
                return (
                  <>
                    <th className="dark:text-gray-400 text-gray-400/50  h-10 px-2 text-left font-medium group-hover:cursor-pointer">
                      {header}
                      {header == "Score" ? (
                        <BiSortAlt2
                          onClick={sortByScore}
                          className="text-xl inline"
                        />
                      ) : null}
                      {header == "Rating" ? (
                        <BiSortAlt2
                          onClick={sortByRating}
                          className="text-xl inline"
                        />
                      ) : null}
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody className=" [&_tr:last-child]:border-0">
            {tableData.map((row, index) => {
              return (
                <tr className="border-b dark:text-black text-white/75 border-gray-800/50 dark:border-gray-300 *:p-2 hover:bg-gray-900/40 dark:hover:bg-gray-100">
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.rating}</td>
                  <td>{row.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <Container>
      <Hero
        title="Our top predictors"
        subtitle="people who prediced the right outcome the most times"
      />

      {generateTable()}
    </Container>
  );
};

export default Leaderboard;
