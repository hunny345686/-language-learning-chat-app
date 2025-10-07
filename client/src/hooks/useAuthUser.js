import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAuthUser, signup } from '../lib/api'

const useSignUp = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  })

  return { isPending, error, signupMutation: mutate }
}
// export default useSignUp

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false,
  })
  return { isLoading: authUser.isLoading, authUser: authUser.data?.user }
}
export default useAuthUser
