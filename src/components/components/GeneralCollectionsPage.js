import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { connect } from "react-redux";
import Loader from "./loader";
import { getCollections, isEmpty } from "../../helpers/getterFunctions";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const CollectionsList = (props) => {
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      let _collections = await getCollections(true);
      setCollections(_collections);
      setLoading(false);
    }

    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="row">
      {console.log("collections", collections)}
      {collections.length >= 1 && !isEmpty(collections[0])
        ? collections.map((collection, index) => (
            <div
              key={index}
              className="d-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12"
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <span
                    onClick={
                      (() =>
                        (window.location.href =
                          "author/" + collection.authorId),
                      "_self")
                    }
                  >
                    <img className="lazy" src={collection.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div
                  className="nft__item_wrap"
                  style={{ height: `${height}px` }}
                >
                  <Outer>
                    <span>
                      <img
                        onLoad={onImgLoad}
                        src={collection.collectionImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </span>
                  </Outer>
                </div>
                <div className="nft__item_info col_info">
                  <span
                    onClick={() =>
                      (window.location.href =
                        "/collection/" + collection.collectionAddress)
                    }
                  >
                    <h4>{collection.collectionName}</h4>
                  </span>

                  <p>{collection.collectionType}</p>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
  };
};

export default connect(mapStateToProps)(CollectionsList);
