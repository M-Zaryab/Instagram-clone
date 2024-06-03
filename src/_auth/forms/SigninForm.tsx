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
import { SignInValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/queryAndMutations";
import { useUserContext } from "@/Context/AuthContext";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.email,
    });

    if (!session) {
      return toast({
        title: "Sign In Failed, please try Again.",
      });
    }

    console.log("session: ", session);

    // const isLoggedIn = await checkAuthUser();
    const isLoggedIn = true;
    console.log(isLoggedIn);

    if (isLoggedIn) {
      console.log("NAVIGATING");

      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign In Failed, please try Again.",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2 pt-3 sm:pt-5">Log in to your ccount</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 mb-2">
          Welcome back! Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 min-w-[400px]"
        >
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
            {isUserLoading ? (
              <div className="">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 mt-2 text-center">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 font-semibold text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
