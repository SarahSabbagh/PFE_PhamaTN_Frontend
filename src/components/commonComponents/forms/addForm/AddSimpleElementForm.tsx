import * as React from "react";
import Box from "@mui/material/Box";
import { DialogContent, Grid } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../InputField/formInput/FormInput";
import { CancelButton } from "../formButton/CancelButton.styles";
import { ConfirmButtonStyled } from "../formButton/ConfirmButton.styles";
import { FormAddProps } from "./AddForm.types";
import { useAddCategoryMutation } from "../../../../redux/api/admin/CategoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { useAddMarqueMutation } from "../../../../redux/api/admin/MarqueApi";
import { useAddFormMutation } from "../../../../redux/api/admin/FormApi";
import { useAddDciMutation } from "../../../../redux/api/dci/dciApi";
import { simpleElementSchema } from "../../../../core/utils/validator/SimpleElementValidator";
import { formTypes } from "../../../../core/constants/formType";
type IDciRequest = TypeOf<typeof simpleElementSchema>;

export const AddSimpleElementForm: React.FC<FormAddProps> = (props) => {
  const { t } = useTranslation();
  const { handleClose, type } = props;
  const methods = useForm<IDciRequest>({
    resolver: zodResolver(simpleElementSchema),
    defaultValues: { name: "" },
    mode: "onChange",
  });

  const { handleSubmit, setError } = methods;
  const [addCategory] = useAddCategoryMutation();
  const [addMarque] = useAddMarqueMutation();
  const [addForm] = useAddFormMutation();
  const [addDci] = useAddDciMutation();
  const submitHandlerAdd: SubmitHandler<IDciRequest> = (data) => {
    let addMutation;
    switch (type) {
      case formTypes.MARQUE_MODAL:
        addMutation = addMarque;
        break;
      case formTypes.FORM_MODAL:
        addMutation = addForm;
        break;
      case formTypes.DCI_MODAL:
        addMutation = addDci;
        break;
      case formTypes.CATEGORY_MODAL:
        addMutation = addCategory;
        break;
      default:
        return;
    }
    addMutation(data.name)
      .unwrap()
      .then(() => {
        handleClose && handleClose();
      })
      .catch((error: any) => {
        for (const key of Object.keys(data)) {
          if (error.data.errors[key]) {
            setError(key as keyof typeof data, {
              type: "server",
              message: error.data.errors[key][0],
            });
          }
        }
      });
  };
  return (
    <DialogContent>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(submitHandlerAdd)}
          noValidate
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormInput
                id="name"
                placeholder={t("cells.NAME")}
                type="Text"
                label={t("cells.NAME")}
                name="name"
                required
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <CancelButton onClick={handleClose}>
                {t("label.CANCEL")}
              </CancelButton>
              <ConfirmButtonStyled type="submit">
                {t("label.ADD")}
              </ConfirmButtonStyled>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </DialogContent>
  );
};
