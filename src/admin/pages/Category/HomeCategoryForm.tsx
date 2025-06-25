import React, { useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Paper, TextField, Typography } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useFormik } from "formik";
import { uploadToCloudinay } from "../../../utils/uploadToCloudinay";
import { Close } from "@mui/icons-material";

interface HomeCategoryFormProps {
  initialValues: { name: string; image: string; categoryId?: string };
  loading?: boolean;
  onSubmit: (values: { name: string; image: string; categoryId?: string }) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const HomeCategoryForm: React.FC<HomeCategoryFormProps> = ({ initialValues, loading, onSubmit, onCancel, submitLabel }) => {
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const uploadedImage = await uploadToCloudinay(file);
    formik.setFieldValue("image", uploadedImage);
    setUploadImage(false);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", '');
  };

  return (
    <Box minHeight="80vh" display="flex" alignItems="center" justifyContent="center">
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, borderColor: 'grey', minWidth: 370, maxWidth: 420, width: '100%' }}>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <input
              type='file'
              accept='image/*'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor='fileInput' style={{ cursor: 'pointer' }}>
              <Box
                width={110}
                height={110}
                borderRadius={2}
                border="2px dashed #bdbdbd"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                bgcolor="#fafafa"
                sx={{ transition: 'border 0.2s', '&:hover': { border: '2px solid #1976d2' } }}
              >
                {formik.values.image ? (
                  <>
                    <img
                      src={formik.values.image}
                      alt="preview"
                      style={{ width: 106, height: 106, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <IconButton
                      onClick={e => { e.stopPropagation(); handleRemoveImage(); }}
                      size="small"
                      color="error"
                      sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'white', boxShadow: 1 }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  uploadImage ? (
                    <CircularProgress size={32} />
                  ) : (
                    <AddPhotoAlternateIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
                  )
                )}
              </Box>
            </label>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Tên danh mục *'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
              sx={{ bgcolor: 'white', borderRadius: 2 }}
            />
            <Box display="flex" gap={2} width="100%" mt={1}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={onCancel}
                sx={{ fontWeight: 600 }}
                type="button"
              >
                HỦY
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ fontWeight: 600 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : (submitLabel || 'Lưu')}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default HomeCategoryForm; 