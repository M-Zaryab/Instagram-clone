import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
// import { createUserAccount } from "@/lib/appwrite/api";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queryAndMutations";
import { useUserContext } from "@/Context/AuthContext";
import { account } from "@/lib/appwrite/config";
import { getCurrentUser, signInAccount } from "@/lib/appwrite/api";

const SignUpForm = () => {
  const { toast } = useToast();
  // Uncomment this 👇
  // const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount__, isPending: isSigningUser } =
    useSignInAccount();

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    console.log("values: ", {
      email: values.email,
      password: values.password,
    });
    const session1 = await signInAccount({
      email: values.email,
      password: values.password,
    });
    console.log("session1: ", session1);

    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign up failed, please try again",
      });
    }

    const session = await signInAccount__({
      email: values.email,
      password: values.password,
    });
    console.log("session: ", session);

    if (!session) {
      console.log("Session undefined!");
      return toast({
        title: "Sign In Failed, please try Again.",
      });
    }

    // const isLoggedIn = await checkAuthUser();
    const isLoggedIn = true;

    console.log("isLoggedIn: ", isLoggedIn);

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "(isLoggedIn) Sign In Failed, please try Again.",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2 pt-3 sm:pt-5">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 mb-2">
          To use Snapgram, please enter account your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 min-w-[400px]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Enter your Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Enter your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    placeholder="Enter your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="shad-button_primary" type="submit">
            {isCreatingAccount ? (
              <div className="">
                <Loader /> Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>

          <p className="text-small-regular text-light-2 mt-2 text-center">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 font-semibold text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
