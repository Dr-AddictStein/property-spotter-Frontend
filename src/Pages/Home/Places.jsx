import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import PlacesCard from "../../components/cards/PlacesCard/PlacesCard";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

const Places = () => {

    const [area, setArea] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [HousePerPage] = useState(8);
    
  useEffect(() => {
    fetchArea();
  }, []);

  const fetchArea = async () => {
    try {
      const response = await axios.get("https://api.propertyspotter.co.za/area/AreasData");
      setArea(response.data);
    } catch (error) {
      console.error( error);
      
    }
  }
  // Logic for pagination
  const indexOfLastFlat = currentPage * HousePerPage;
  const indexOfFirstFlat = indexOfLastFlat - HousePerPage;
  const currentAgency = area.slice(
    indexOfFirstFlat,
    indexOfLastFlat
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <>
        <section className="bg-white py-10 px-6 md:px-0">
            <SectionTitle
                heading={"Provinces and Cities"}
                subheading={"Exploring Provinces and Cities near by you"}
            />
            <Container>
                <div className="flex flex-wrap gap-3">
                    {currentAgency.map((item) => (
                        <PlacesCard key={item.id} item={item} />
                    ))}
                </div>
            </Container>

             {/* for pagination */}
          {/* <div className=" flex flex-wrap justify-center mb-10 mt-10">
            <button
              className="join-agencys btn btn-outline btn-primary mr-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="text-white"> &larr; Previous page</span>
            </button>
            {Array.from(
              { length: Math.ceil(area.length / HousePerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`join-agencys btn btn-outline btn-primary  text-white mr-2 ${
                    currentPage === i + 1
                      ? "bg-primary border-2 border-black text-white"
                      : ""
                  }`}
                >
                  <span className="text-white">{i + 1}</span>
                </button>
              )
            )}
            <button
              className="join-agencys btn btn-outline btn-primary  mr-2"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(area.length / HousePerPage)
              }
            >
              <span className="text-white">Next&rarr;</span>
            </button>
          </div> */}
        </section>
      </>
    );
};

export default Places;
