import {
  Dot,
  DotMain,
  DotsContainer,
  LoadingContainer,
  LoadingDots,
} from "./styles";

export function Loading() {
  return (
    <LoadingContainer>
      <LoadingDots>
        <DotMain />
        <DotsContainer>
          <Dot />
          <Dot />
          <Dot />
        </DotsContainer>
      </LoadingDots>
    </LoadingContainer>
  );
}
