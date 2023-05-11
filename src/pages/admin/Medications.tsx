import * as React from "react";
import { FC } from "react";
import { Grid } from "@mui/material";
import { PageContainer } from "../../components/commonComponents/PageContainer/PageContainer";
import { TableFactory } from "../../components/commonComponents/table/tableFactory/TableFactory";
import { formTypes } from "../../core/constants/formType";
import { TypeOf } from "zod";
import { medicationSchema } from "../../core/utils/validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicationColumns } from "../../core/constants/tableColumns/medicationColumns";
import {
  useAddMedicationMutation,
  useDeleteMedicationMutation,
  useMedicationsFilterQuery,
  useUpdateMedicationMutation,
} from "../../redux/api/admin/MedicationApi";
import { IMedicationElement } from "../../redux/api/types/IMedication";
import { useToasts } from "react-toast-notifications";

type IMedicationRequest = TypeOf<typeof medicationSchema>;

export const MedicationsPage: FC = () => {
  const { addToast, removeToast } = useToasts();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [query, setQuery] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<"desc" | "asc">("asc");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { data, isLoading, isFetching } = useMedicationsFilterQuery({
    ...(query && { search: query }),
    ...{
      page_size: rowsPerPage,
      page: page + 1,
      sortBy: sortBy,
      sortOrder: sortOrder,
    },
  });
  const [deleteMedication] = useDeleteMedicationMutation();
  const [addMedication, { isLoading: addIsLoading, isSuccess: isSuccessAdd }] =
    useAddMedicationMutation();

  const handleDciDelete = (id: number) => {
    deleteMedication(id).unwrap();
  };
  const [
    updateMedication,
    { isLoading: editIsLoading, isSuccess: editIsSuccess },
  ] = useUpdateMedicationMutation();

  const handleEdit: SubmitHandler<IMedicationElement> = async (data) => {
    const { id, ...rest } = data;
    updateMedication({ id: id, ...rest })
      .unwrap()
      .then(() => {
        // handleClose();
        addToast("Saved Successfully", {
          appearance: "success",
          key: "edit-medication",
        });
      });
  };
  const submitHandlerAdd: SubmitHandler<IMedicationRequest> = (data) => {
    addMedication(data)
      .unwrap()
      .then(() => {
        handleClose();
      });
  };
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setQuery(event.target.value.trim());
    }, 1000);
  };

  const onRequestSort = (
    event: React.MouseEvent<unknown>,
    newSortBy: string
  ) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <PageContainer title={"Medication"}>
      <Grid>
        <TableFactory<
          IMedicationElement[],
          IMedicationRequest,
          IMedicationElement
        >
          columns={medicationColumns}
          data={data?.data}
          sort={{
            onRequestSort: onRequestSort,
            sortOrder: sortOrder,
            sortBy: sortBy,
          }}
          handleQueryChange={handleQueryChange}
          title={"Medications"}
          isLoading={isLoading}
          isFetching={isFetching}
          actions={{
            add: {
              add: true,
              addFormType: formTypes.ADD_MEDICATION_MODAL,
              titleAddForm: "add Medication",
              defaultAddValues: {
                dci_id: 0,
                marque_id: 0,
                form_id: 0,
                category_id: 0,
                dosage: "",
                description: "",
              },
              addResolver: zodResolver(medicationSchema),
              onSubmitAdd: submitHandlerAdd,
              isLoadingAddForm: addIsLoading,
              isSuccessAddForm: isSuccessAdd,
            },
            edit: {
              edit: true,
              editFormType: formTypes.EDIT_MEDICATION_MODAL,
              editResolver: zodResolver(medicationSchema),
              onSubmitEdit: handleEdit,
              isLoadingEditForm: editIsLoading,
              isSuccessEditForm: editIsSuccess,
            },
            delete: { delete: true, handleDelete: handleDciDelete },
          }}
          handleModal={{
            handleClickOpen: handleClickOpen,
            open: open,
            handleClose: handleClose,
          }}
          page={page}
          count={data?.total ?? 0}
          rowsPerPageOptions={[10, 25, 50, 100]}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </PageContainer>
  );
};
