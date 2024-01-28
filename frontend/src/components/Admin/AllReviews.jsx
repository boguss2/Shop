import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { getAllProducts } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
import "../../styles/styles.css";
import axios from "axios";
import { useBackendServer } from "../../contexts/BackendContext";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const AllReviews = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteParams, setDeleteParams] = useState(null);
  const backend = useBackendServer();

  const handleClickOpen = (params) => {
    setDeleteParams(params);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts) {
      const allReviews = allProducts.flatMap((product) => product.reviews);
      setReviews(allReviews);
    }
  }, [allProducts]);

  const columns = [
    { field: "reviewId", headerName: "Review Id", minWidth: 150, flex: 0.7 },
    {
      field: "user",
      headerName: "User",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "productId",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row.productId}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Remove Review",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() =>
              handleClickOpen({
                productId: params.row.productId,
                id: params.row.reviewId,
              })
            }
          >
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const rows = reviews.map((review, index) => ({
    index: index + 1,
    user: review.user.name,
    rating: review.rating,
    comment: review.comment,
    productId: review.productId,
    createdAt: review.createdAt,
    id: index,
    reviewId: review._id,
  }));

  const handleDelete = async (params) => {
    const productId = params.productId;
    const reviewId = params.id;

    await axios
      .put(
        `${backend.api}/product/${productId}/review/${reviewId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });

    // Refresh the reviews
    dispatch(getAllProducts());
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this review?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`button text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`button text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => {
                    setOpen(false);
                    if (deleteParams) {
                      handleDelete(deleteParams);
                    }
                  }}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
