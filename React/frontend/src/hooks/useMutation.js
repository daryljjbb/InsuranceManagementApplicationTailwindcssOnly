const createPolicy = async (policyData) => {
  const res = await axios.post('/api/policies/', policyData);
  return res.data;
};

const mutation = useMutation(createPolicy, {
  onSuccess: () => {
    refetch(); // refresh policies automatically
  }
});
