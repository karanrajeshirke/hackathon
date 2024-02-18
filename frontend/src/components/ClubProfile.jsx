import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout/Layout";
import BlogDisplay from "./BlogDisplay";
const ClubProfile = () => {
  const { clubId } = useParams();
  const [clubInfo, setClubInfo] = useState("");
  const [clubmember, setclubmember] = useState([]);

  const getSpecificClub = async (req, res) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/general/club/${clubId}`
      );
      //   console.log(response.data.clubData);
      // setClubData(response.data.clubs);
      setClubInfo(response.data.clubData);
    } catch (error) {
      console.log(error);
    }
  };

  const clubPositionInfo = async (req, res) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/general/member/${clubId}`
      );
      console.log(response.data.members);
      // setClubData(response.data.clubs);
      setclubmember(response.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecificClub();
    clubPositionInfo();
  }, []);

  return (
    //member,events,blogs,
    <>
      <Layout />
      <div className="row m-5">
        <div className="col-12">
          <div className="row">
            <div className="col-6 bg-primary">
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, consequatur natus. Ex nostrum enim iure asperiores.
                Repudiandae vero obcaecati consectetur veniam assumenda
                blanditiis laudantium iure debitis molestias pariatur. Quia,
                ullam? Ipsa cupiditate ad odit, ut ea atque qui excepturi animi
                molestias, distinctio quam quisquam quo esse rerum architecto
                accusantium fugit nam quod ipsam id libero minima odio! Quos,
                mollitia neque! Voluptate excepturi dolor inventore nihil.
                Maiores, ex voluptatum doloremque molestias sint mollitia quos
                eius sunt tenetur enim reprehenderit architecto culpa quisquam.
                Quibusdam dolor delectus architecto commodi labore eligendi,
                facere sed. Qui tempore ullam officia dolorem molestiae! Aliquam
                itaque cupiditate in sint eligendi atque iusto quos ipsam ipsum
                temporibus necessitatibus repellat sequi voluptatem accusamus
                nisi quo dolore obcaecati eos, iste impedit. Ipsam harum
                accusantium id saepe maiores ea ab dolores nisi repudiandae.
                Inventore quibusdam impedit ipsa labore at ad ipsam commodi
                voluptate, mollitia, suscipit perspiciatis quae sequi magni
                incidunt aliquam non?
              </div>
            </div>
            <div className="col-6 bg-danger">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              sequi amet provident a! Quasi, similique odio ratione inventore
              quos vitae ea natus iusto, minima nesciunt aliquam delectus veniam
              amet magnam! Nesciunt dolore tempore eaque ab? Tenetur quia porro
              incidunt vel voluptatum. Culpa, aliquam debitis sed maxime aut
              maiores repudiandae dicta eum modi, voluptates, perspiciatis
              labore a necessitatibus sapiente. Eum, deleniti? Nesciunt commodi
              aliquid omnis, officiis dolor optio veritatis perferendis
              incidunt! Deleniti maiores unde optio corporis, aperiam nemo
              incidunt at itaque, beatae ut voluptatum magnam suscipit! Eius
              adipisci cumque eaque fugiat! Delectus, ad eligendi. Repellendus
              eveniet sequi similique. Impedit alias omnis distinctio veniam
              odit id accusantium at hic, obcaecati et nisi, veritatis labore
              enim sed debitis cumque voluptatum neque voluptatem ipsam?
              Voluptate, quis. Recusandae sit inventore ex ipsa dignissimos,
              enim quisquam deleniti non illum commodi delectus quaerat
              similique cupiditate quo earum id perferendis voluptatem sunt
              reprehenderit! Similique nemo minima consequatur optio.
            </div>
          </div>

          <div className="col-12">
            <BlogDisplay clubId={clubId} />
          </div>
        </div>

        <h1>MEMBERS</h1>
        <div className="col-12 bg-light d-flex flex-wrap justify-content-between ">
          {clubmember &&
            clubmember.map((member) => {
              return (
                <div
                  className="card p-3 m-3"
                  key={member._id}
                  style={{ width: "18rem" }}
                >
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{member.name}</h5>
                    {/* <h5 className="card-title">{member.position}</h5> */}

                    <p className="card-text">{member.bio}</p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ClubProfile;
