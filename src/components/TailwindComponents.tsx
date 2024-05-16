import tw from "tailwind-styled-components";

export const HomeContainer = tw.div`
  max-w-[3000px]
  m-auto
`;

export const Container = tw.div`
    max-w-[1200px]
    m-auto
`;

export const Section = tw.section<{
  $noXPadding?: boolean;
  $noYPadding?: boolean;
}>`
${(p) => (p.$noXPadding ? "px-0" : "px-4")}
${(p) => (p.$noYPadding ? "py-0" : "py-12 md:py-15 lg:py-[120px]")}
sm:px-6
`;

export const Textarea = tw.textarea<{
  $error: boolean | undefined | undefined;
}>`
${(p) => (p.$error ? "border-red-500" : "border-gray-400")}
${(p) => (p.$error ? "placeholder-red-500" : "placeholder-gray-500")}
rounded-lg
border
px-4
py-3
focus:outline-none
focus:border-gray-900
w-full
bg-gray-50
min-h-[125px]
`;

export const Input = tw.input<{ $error: boolean | undefined }>`
${(p) => (p.$error ? "border-red-500" : "border-gray-400")}
${(p) => (p.$error ? "placeholder-red-500" : "placeholder-gray-500")}
rounded-lg
border
px-4
py-3
focus:outline-none
focus:border-gray-900
w-full
bg-gray-50
`;

export const FormH1 = tw.h1`
text-3xl
font-bold
`;

export const StyledH1 = tw.h1`
text-3xl 
md:text-4xl 
font-bold
`;

export const StyledH2 = tw.h2`
text-2xl 
md:text-3xl
font-medium
mb-4
md:mb-6
`;

export const Divider = tw.div`
bg-gray-300
h-[1px]
max-w-full
`;
