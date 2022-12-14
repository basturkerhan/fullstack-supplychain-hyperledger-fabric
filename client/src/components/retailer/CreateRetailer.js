import React from 'react'
import CreateUser from '../admin/CreateUser';
import PageLayout from '../panel/layout/PageLayout';

const CreateRetailer = () => {
  return (
    <PageLayout page="Perakendeci Ekle">
    <CreateUser memberRole="retailer" />
  </PageLayout>
  )
}

export default CreateRetailer;