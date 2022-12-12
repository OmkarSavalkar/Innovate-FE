import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import ExpertTechUsers from "./expertTechUsers";

const DiscussComponent = (props: any) => {
  const { userData } = props;
  const [expertStack, setExpertStack] = useState([]);
  const [currentTechObjId, setCurrentTechObjId] = React.useState(null);

  const onCurrentChange = (current: any) => {
    setCurrentTechObjId(current?.item?.children?.props?.item?._id);
  };

  useEffect(() => {
    userData && setExpertStack(userData?.techStackId);
  }, []);

  return (
    <>
      <Carousel onNextEnd={onCurrentChange} onPrevEnd={onCurrentChange}>
        {expertStack.map((item: any, index: number) => {
          return (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100vh",
                backgroundImage: `url(https://connectwell-5f9f8.web.app/forumBackground.png)`,
                borderRadius: "30px",
                backgroundSize: "cover",
                padding: "2px",
              }}
            >
              <ExpertTechUsers
                item={item}
                currentTechObjId={currentTechObjId}
                firstItemTechObjId={userData?.techStackId[0]?._id}
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
};
export default DiscussComponent;
