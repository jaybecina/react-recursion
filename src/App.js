import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  inputString: yup.string().min(0).max(50).required(),
});

function reverseStr(str) {
  // Use the split() method to return a new array
  var splitString = str.split("");

  // Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse();

  // Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join("");

  // Return the reversed string
  return joinArray;
}

function App() {
  const [output, setOutput] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    let result = reverseStr(data.inputString);
    setOutput(result);
    reset();
  };

  return (
    <div className="App">
      <Container>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Permutation</h1>
        <p>
          Write a function that takes in two strings and returns true if one is
          a permutation of the other. Optimize for time complexity.
        </p>
        <p>Answer:</p>
        <Container style={{ width: 300, height: 500 }}>
          <Form
            onSubmit={handleSubmit(onSubmitHandler)}
            style={{ marginBottom: 20 }}
          >
            <Form.Group className="mb-3" controlId="formBasicString1">
              <Form.Label>String 1</Form.Label>
              <Form.Control
                {...register("inputString")}
                type="text"
                name="inputString"
                placeholder="Enter string"
                required
              />
              <p style={{ color: "red" }}>{errors.inputString?.message}</p>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {output !== null && (
            <Alert
              variant={output ? "success" : "danger"}
              style={{ textAlign: "center" }}
            >
              <h5>{output}</h5>
            </Alert>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default App;
