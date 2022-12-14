import React from 'react'
import CreateUser from '../admin/CreateUser';
import PageLayout from '../panel/layout/PageLayout';

const CreateShipper = () => {
  return (
    <PageLayout page="Nakliyeci Ekle">
    <CreateUser memberRole="shipper" />
  </PageLayout>
  )
}

export default CreateShipper;