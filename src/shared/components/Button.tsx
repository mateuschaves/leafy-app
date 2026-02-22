import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonContainer = styled.TouchableOpacity<{
  variant: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.accent;
      case 'danger': return theme.colors.error;
      case 'ghost': return 'transparent';
      default: return theme.colors.primary;
    }
  }};
  border-width: ${({ variant }) => (variant === 'ghost' ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const ButtonText = styled.Text<{ variant: ButtonVariant }>`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary': return theme.colors.text.inverse;
      case 'secondary': return theme.colors.text.primary;
      case 'danger': return theme.colors.text.inverse;
      case 'ghost': return theme.colors.text.primary;
      default: return theme.colors.text.inverse;
    }
  }};
`;

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const theme = useTheme();
  return (
    <ButtonContainer
      variant={variant}
      onPress={onPress}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary}
          size="small"
        />
      ) : (
        <ButtonText variant={variant}>{title}</ButtonText>
      )}
    </ButtonContainer>
  );
};
