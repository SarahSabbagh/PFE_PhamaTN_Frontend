import * as React from "react";
import Box from "@mui/material/Box";
import { FC } from "react";
import Grid from "@mui/material/Grid";
import { TypeOf } from "zod";
import { signUpSchema } from "../core/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../components/commonComponents/InputField/formInput/FormInput";
import { ButtonSignUp } from "../components/signUpComponents/buttonSignUp/ButtonSignUp";
import { RoleBlock } from "../components/signUpComponents/roleBlock/RoleBlock";
import { SignUpPaper } from "../components/signUpComponents/signUpPaper/signUpPaper";
import { SelectField } from "../components/commonComponents/InputField/selectInput/SelectField";
import { SignInContainer } from "../components/signInComponents/signInContainer/SignInContainer";
import { InputImage } from "../components/signUpComponents/inputImage/InputImage";
import { useTranslation } from "react-i18next";
import { useRegisterMutation } from "../redux/api/auth/authApi";

export type ISignUpRequest = TypeOf<typeof signUpSchema>;

export const Register: FC = () => {
  const { t } = useTranslation();

  const names = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Le Kef",
    "Mahdia",
    "La Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];
  // ? Default Values
  const defaultValues: ISignUpRequest = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pharmacyFirstName: "",
    pharmacyLastName: "",
    governorate: "1",
    delegation: "1",
    address: "",
    role: "1",
    //image: "",
    type: "1",
    fax: "",
    phone: "",
  };
  const [register] = useRegisterMutation();

  const methods = useForm<ISignUpRequest>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    //   mode: "onChange",
  });
  const { handleSubmit } = methods;
  const [verificationToken, setVerificationToken] = React.useState(null);
  const [isRegistered, setIsRegistered] = React.useState(false);

  const submitHandler: SubmitHandler<ISignUpRequest> = async (data) => {
    const { confirmPassword, ...rest } = data;

    const response = register({ ...rest })
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    //  setVerificationToken(response.verification_token);
    // alert('An email has been sent to your email address with a verification link.');
  };

  return (
    <>
      {!isRegistered ? (
        <SignInContainer title={t("register.TITLE_PAGE_SIGN_UP")}>
          <Grid container>
            <SignUpPaper title={t("register.TITLE_SIGN_UP")}>
              <FormProvider {...methods}>
                <Box
                  component="form"
                  onSubmit={handleSubmit(submitHandler)}
                  noValidate
                >
                  <Grid container item rowSpacing={1} columnSpacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="name"
                        placeholder={t("register.NAME_LABEL")}
                        type="Text"
                        label={t("register.NAME_LABEL")}
                        name="name"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="email"
                        placeholder={t("register.EMAIL_LABEL")}
                        type="email"
                        label={t("register.EMAIL_LABEL")}
                        name="email"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="password"
                        type="password"
                        label={t("register.PASSWORD_LABEL")}
                        name="password"
                        placeholder={t("register.PASSWORD_LABEL")}
                        eyeicon
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="confirmPassword"
                        type="password"
                        label={t("register.CONFIRM_PASSWORD_LABEL")}
                        name="confirmPassword"
                        placeholder={t("register.PASSWORD_LABEL")}
                        eyeicon
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid container item xs={12} minHeight={"120px"}>
                      <RoleBlock name="role" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="firstName"
                        placeholder={t("register.FIRST_NAME_LABEL")}
                        type="Text"
                        label={t("register.FIRST_NAME_LABEL")}
                        name="pharmacyFirstName"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="lastName"
                        placeholder={t("register.LAST_NAME_LABEL")}
                        type="Text"
                        label={t("register.LAST_NAME_LABEL")}
                        name="pharmacyLastName"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <SelectField
                        id="governorate"
                        label={t("register.GOVERNORATE_LABEL")}
                        placeholder={t("register.GOVERNORATE_LABEL")}
                        name="governorate"
                        options={names}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <SelectField
                        id="delegation"
                        label={t("register.DELEGATION_LABEL")}
                        placeholder={t("register.DELEGATION_LABEL")}
                        name="delegation"
                        options={names}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="address"
                        placeholder={t("register.ADDRESS_LABEL")}
                        type="Text"
                        label={t("register.ADDRESS_LABEL")}
                        name="address"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputImage
                        id="image"
                        label={t("register.IMAGE_LABEL")}
                        placeholder={t("register.IMAGE_LABEL")}
                        name="image"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="phone"
                        placeholder={t("register.PHONE_LABEL")}
                        type="text"
                        label={t("register.PHONE_LABEL")}
                        name="phone"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInput
                        id="fax"
                        placeholder={t("register.FAX_LABEL")}
                        type="text"
                        label={t("register.FAX_LABEL")}
                        name="fax"
                        required
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      minHeight={"122px"}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <ButtonSignUp type="submit">
                        {t("register.SIGN_UP")}
                      </ButtonSignUp>
                    </Grid>
                  </Grid>
                </Box>
              </FormProvider>
            </SignUpPaper>
          </Grid>
        </SignInContainer>
      ) : (
        <p>
          An email has been sent to {} with a verification link. Please click
          the link
        </p>
      )}
    </>
  );
};
