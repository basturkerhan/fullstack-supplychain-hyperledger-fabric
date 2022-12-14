import React from 'react'
import CreateUser from '../admin/CreateUser';
import PageLayout from '../panel/layout/PageLayout';

const CreateProducer = () => {
  return (
    <PageLayout page="Üretici Ekle">
    <CreateUser memberRole="producer" />
  </PageLayout>
  )
}

export default CreateProducer;