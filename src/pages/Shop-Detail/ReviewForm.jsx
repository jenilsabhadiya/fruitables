import { Form, Formik } from "formik";
import React from "react";
import TestInput from "../../Admin/components/TestInput/TestInput";
import Rating1 from "../../Admin/components/Rating/Rating1";
import { Button } from "@mui/material";
import { mixed, object, string } from "yup";
import { useParams } from "react-router-dom";

function ReviewForm() {
  const { id } = useParams();
  console.log(id);
  let reviewSchema = object({
    name: string()
      .required()
      .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed"),
    email: string().required(),
    review: string()
      .required()
      .test("review", "Max 5 word allowed", (val) => {
        const arr = val.split(" ");
        // console.log(arr);

        if (arr.length <= 5) {
          return true;
        } else {
          return false;
        }
      }),
    half_rating: mixed()
      .required()
      .test("half_rating", "Rating must be between 0.5 and 5", (value) => {
        return value >= 0.5 && value <= 5;
      }),
  });

  const handleReviewSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("Saved successfully:", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          review: "",
          half_rating: 1,
          status: false,
          productId: "",
        }}
        validationSchema={reviewSchema}
        onSubmit={async (values, { resetForm }) => {
          const newValues = { ...values, productId: id };
          console.log(newValues);

          await handleReviewSubmit(newValues);
          resetForm();
        }}
      >
        <Form id="subscription-form">
          <h4 className="mb-5 fw-bold">Leave a Reply</h4>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="border-bottom rounded">
                <TestInput
                  id="name"
                  name="name"
                  className="form-control border-0 me-4"
                  label="Your Name *"
                />
                {/* <input
                    type="text"
                    className="form-control border-0 me-4"
                    placeholder="Your Name *"
                  /> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="border-bottom rounded">
                {/* <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Your Email *"
                  /> */}
                <TestInput
                  type="email"
                  id="email"
                  name="email"
                  className="form-control border-0 me-4"
                  label="Your Email *"
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="border-bottom rounded my-4">
                {/* <textarea
                    name
                    id
                    className="form-control border-0"
                    cols={30}
                    rows={8}
                    placeholder="Your Review *"
                    spellCheck="false"
                    defaultValue={""}
                  /> */}
                <TestInput
                  id="review"
                  label="Review"
                  name="review"
                  placeholder="Your Review *"
                  multiline={true}
                  className="form-control border-0"
                  rows={8}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="d-flex justify-content-between py-3 mb-5">
                <div className="d-flex align-items-center">
                  <p className="mb-0 me-3">Please rate:</p>
                  <div
                    className="d-flex align-items-center"
                    style={{ fontSize: 12 }}
                  >
                    <Rating1
                      id="half_rating"
                      name="half_rating"
                      label="Rating:-"
                    />
                  </div>
                </div>
                {/* <a href="#"> Post Comment</a> */}
                <Button
                  type="submit"
                  className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                  form="subscription-form"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default ReviewForm;
