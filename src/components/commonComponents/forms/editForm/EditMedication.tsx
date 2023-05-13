import * as React from "react";
import Box from "@mui/material/Box";
import { DialogContent, Grid } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../InputField/formInput/FormInput";
import { CancelButton } from "../formButton/CancelButton.styles";
import { ConfirmButtonStyled } from "../formButton/ConfirmButton.styles";
import { SelectField } from "../../InputField/selectInput/SelectField";
import { ISimpleElement } from "../../../../redux/api/types/IResponseRequest";
import { FormEditMedicationProps } from "./EditForm.types";
import { TypeOf } from "zod";
import { medicationEditSchema } from "../../../../core/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateMedicationMutation } from "../../../../redux/api/admin/MedicationApi";
import { useToasts } from "react-toast-notifications";
import { Loader } from "../../loader/Loader";

export type IMedicationEditRequest = TypeOf<typeof medicationEditSchema>;

export const EditMedication: React.FC<FormEditMedicationProps> = (props) => {
  const {
    handleClose,
    defaultValues,
    isLoading,
    dcis,
    forms,
    categories,
    marques,
  } = props;

  const { addToast } = useToasts();

  const methods = useForm<IMedicationEditRequest>({
    resolver: zodResolver(medicationEditSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });
  const { handleSubmit } = methods;

  const [updateMedication] = useUpdateMedicationMutation();

  const onSubmit: SubmitHandler<IMedicationEditRequest> = async (data) => {
    const { id, ...rest } = data;
    updateMedication({ id: id, ...rest })
      .unwrap()
      .then(() => {
        handleClose();
        addToast("Saved Successfully", {
          appearance: "success",
          key: "edit-medication",
        });
      });
  };
  return (
    <DialogContent>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {isLoading ? (
            <Loader />
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <SelectField<ISimpleElement>
                  id="dci"
                  label="DCI"
                  placeholder="DCI"
                  name="dci_id"
                  options={dcis}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectField<ISimpleElement>
                  id="dci"
                  label="brand"
                  placeholder="brand"
                  name="marque_id"
                  options={marques}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectField<ISimpleElement>
                  id="form"
                  label="form"
                  placeholder="form"
                  name="form_id"
                  options={forms}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectField<ISimpleElement>
                  id="category"
                  label="category"
                  placeholder="category"
                  name="category_id"
                  options={categories}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  id="dosage"
                  placeholder="dosage"
                  type="Text"
                  label="dosage"
                  name="dosage"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput
                  id="description"
                  placeholder="description"
                  type="Text"
                  label="description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <CancelButton onClick={handleClose}>Cancel</CancelButton>
                <ConfirmButtonStyled type="submit">Edit</ConfirmButtonStyled>
              </Grid>
            </Grid>
          )}
        </Box>
      </FormProvider>
    </DialogContent>
  );
};
