import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useAddPlant } from '../hooks/usePlants';
import { PlantFormData } from '../types';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const BackButton = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const BackButtonText = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xl}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ScrollContent = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const EmojiSelector = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const SelectedEmoji = styled.Text`
  font-size: 72px;
`;

const EmojiRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const EmojiOption = styled.TouchableOpacity<{ selected: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.accent : theme.colors.background};
  align-items: center;
  justify-content: center;
  border-width: ${({ selected }) => (selected ? 2 : 1)}px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.border};
  margin: 4px;
`;

const EmojiOptionText = styled.Text`
  font-size: 24px;
`;

const FieldContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const FieldLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const StyledInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.primary};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px;
`;

const SaveButton = styled.TouchableOpacity<{ isPending: boolean }>`
  background-color: ${({ theme, isPending }) =>
    isPending ? theme.colors.accent : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const SaveButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: white;
`;

const EMOJI_OPTIONS = ['🌱', '🌿', '🌵', '🌸', '🌺', '🍃', '🪴', '🌻', '🌹', '🌷', '🍀', '🎋', '🎍', '🌾', '☘️', '🌲', '🌳'];

interface PlantFormScreenProps {
  navigation: any;
  route?: { params?: { catalogPlant?: any } };
}

export const PlantFormScreen: React.FC<PlantFormScreenProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const addPlant = useAddPlant();
  const catalogPlant = route?.params?.catalogPlant;

  const [name, setName] = useState(catalogPlant?.name ?? '');
  const [description, setDescription] = useState(catalogPlant?.description ?? '');
  const [wateringInterval, setWateringInterval] = useState(
    catalogPlant?.wateringIntervalDays ? String(catalogPlant.wateringIntervalDays) : ''
  );
  const [emoji, setEmoji] = useState(catalogPlant?.emoji ?? '🌱');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = t('plants.form.validation.nameRequired');
    if (!wateringInterval.trim()) newErrors.interval = t('plants.form.validation.intervalRequired');
    else if (isNaN(Number(wateringInterval)) || Number(wateringInterval) <= 0) {
      newErrors.interval = t('plants.form.validation.intervalInvalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const formData: PlantFormData = {
      name: name.trim(),
      description: description.trim(),
      wateringIntervalDays: Number(wateringInterval),
      emoji,
    };

    addPlant.mutate(formData, {
      onSuccess: () => {
        navigation.navigate('MyPlants');
      },
      onError: () => {
        Alert.alert(t('common.error'), t('errors.savePlant'));
      },
    });
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <BackButtonText>←</BackButtonText>
        </BackButton>
        <HeaderTitle>{t('plants.form.title')}</HeaderTitle>
      </Header>

      <ScrollContent showsVerticalScrollIndicator={false}>
        <EmojiSelector>
          <SelectedEmoji>{emoji}</SelectedEmoji>
          <EmojiRow>
            {EMOJI_OPTIONS.map((e) => (
              <EmojiOption
                key={e}
                selected={emoji === e}
                onPress={() => setEmoji(e)}
                activeOpacity={0.8}
              >
                <EmojiOptionText>{e}</EmojiOptionText>
              </EmojiOption>
            ))}
          </EmojiRow>
        </EmojiSelector>

        <FieldContainer>
          <FieldLabel>{t('plants.form.nameLabel')}</FieldLabel>
          <StyledInput
            value={name}
            onChangeText={setName}
            placeholder={t('plants.form.namePlaceholder')}
            placeholderTextColor={theme.colors.text.muted}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>{t('plants.form.descriptionLabel')}</FieldLabel>
          <StyledInput
            value={description}
            onChangeText={setDescription}
            placeholder={t('plants.form.descriptionPlaceholder')}
            placeholderTextColor={theme.colors.text.muted}
            multiline
            numberOfLines={3}
            style={{ height: 80, textAlignVertical: 'top' }}
          />
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>{t('plants.form.wateringIntervalLabel')}</FieldLabel>
          <StyledInput
            value={wateringInterval}
            onChangeText={setWateringInterval}
            placeholder={t('plants.form.wateringIntervalPlaceholder')}
            placeholderTextColor={theme.colors.text.muted}
            keyboardType="numeric"
          />
          {errors.interval && <ErrorText>{errors.interval}</ErrorText>}
        </FieldContainer>

        <SaveButton onPress={handleSave} isPending={addPlant.isPending} activeOpacity={0.8}>
          <SaveButtonText>
            {addPlant.isPending ? t('common.loading') : t('plants.form.savePlant')}
          </SaveButtonText>
        </SaveButton>
      </ScrollContent>
    </Container>
  );
};
