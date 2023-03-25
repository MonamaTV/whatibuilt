import { userSchema } from "@/validations/UserValidations";
import { User } from "@prisma/client";
import { Formik, Form, Field } from "formik";
import React from "react";

type FormProps = {
  handleSubmit: (user: Partial<User>) => void;
  user: Partial<User>;
  state?: boolean;
};

const UserForm = ({ handleSubmit, user, state }: FormProps) => {
  return (
    <Formik
      initialValues={user}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      {({ errors, touched, dirty, isSubmitting }) => (
        <Form className="space-y-3">
          <Field
            name="name"
            className="w-full  px-3 py-2 dark:bg-zinc-600 outline-none border dark:border-none text-sm dark:text-gray-100 text-gray-700 border-zinc-300"
          />
          {errors.name && touched.name ? (
            <p className="text-red-600 text-sm">{errors.name}</p>
          ) : null}
          <Field
            name="role"
            className="w-full  px-3 py-2 dark:bg-zinc-600 outline-none border dark:border-none text-sm dark:text-gray-100 text-gray-700 border-zinc-300"
          />
          {errors.role && touched.role ? (
            <p className="text-red-600 text-sm">{errors.role}</p>
          ) : null}
          <Field
            name="bio"
            rows={10}
            as="textarea"
            className="w-full border-zinc-300 px-3 py-3 dark:bg-zinc-600 resize-none outline-none border dark:border-none text-sm dark:text-gray-100 text-gray-700 focus:peer-disabled:block peer "
          />
          {errors.bio && touched.bio ? (
            <p className="text-red-600 text-sm">{errors.bio}</p>
          ) : null}
          <button
            disabled={!dirty || state}
            className="text-gray-900 px-3 py-2 capitalize text-sm bg-primary  w-44 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed"
            type="submit"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;