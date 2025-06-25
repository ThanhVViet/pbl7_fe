import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { createHomeCategory } from '../../../state/admin/AdminSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import HomeCategoryForm from './HomeCategoryForm';

const AddCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector(store => store.admin);

  return (
    <HomeCategoryForm
      initialValues={{ name: '', image: '', categoryId: '' }}
      loading={loading}
      submitLabel="Thêm danh mục"
      onCancel={() => navigate(-1)}
      onSubmit={async (values) => {
        const categoryId = values.name
          .toLowerCase()
          .normalize('NFD').replace(/\u0300|\u0301|\u0303|\u0309|\u0323|\u02C6|\u0306|\u031B/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        const payload = { ...values, categoryId };
        await dispatch(createHomeCategory({ ...payload, jwt: localStorage.getItem('jwt') || '' }));
        toast.success('Thêm danh mục thành công');
        navigate(-1);
      }}
    />
  );
};

export default AddCategory;
