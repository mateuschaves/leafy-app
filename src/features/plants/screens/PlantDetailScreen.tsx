import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useWaterPlant, useDeletePlant } from '../hooks/usePlants';
import { Plant } from '../types';
import { format } from 'date-fns';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xxl}px ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md}px;
  left: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const BackButtonText = styled.Text`
  font-size: 24px;
  color: white;
`;

const PlantEmoji = styled.Text`
  font-size: 80px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const PlantName = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xxl}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: white;
  text-align: center;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Section = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm}px 0;
`;

const InfoLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const InfoValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DescriptionText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 24px;
`;

const WaterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const WaterButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: white;
`;

const DeleteButton = styled.TouchableOpacity`
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const DeleteButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.error};
`;

interface PlantDetailScreenProps {
  navigation: any;
  route: { params: { plant: Plant } };
}

export const PlantDetailScreen: React.FC<PlantDetailScreenProps> = ({ navigation, route }) => {
  const { plant } = route.params;
  const { t } = useTranslation();
  const waterPlant = useWaterPlant();
  const deletePlant = useDeletePlant();

  const handleWater = () => {
    waterPlant.mutate(plant, {
      onSuccess: () => navigation.goBack(),
    });
  };

  const handleDelete = () => {
    Alert.alert(
      t('plants.detail.delete'),
      t('plants.detail.deleteConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            deletePlant.mutate(plant, {
              onSuccess: () => navigation.goBack(),
            });
          },
        },
      ]
    );
  };

  return (
    <Container>
      <HeroSection>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <BackButtonText>←</BackButtonText>
        </BackButton>
        <PlantEmoji>{plant.emoji}</PlantEmoji>
        <PlantName>{plant.name}</PlantName>
      </HeroSection>

      <Content showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>{t('plants.detail.description')}</SectionTitle>
          <DescriptionText>{plant.description || t('plants.detail.noDescription')}</DescriptionText>
        </Section>

        <Section>
          <SectionTitle>{t('plants.detail.wateringInfo')}</SectionTitle>
          <InfoRow>
            <InfoLabel>{t('plants.detail.wateringInterval')}</InfoLabel>
            <InfoValue>
              {t('plants.detail.every', { count: plant.wateringIntervalDays })}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('plants.card.lastWatered')}</InfoLabel>
            <InfoValue>{format(new Date(plant.lastWateredAt), 'MMM d, yyyy')}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('plants.card.nextWatering')}</InfoLabel>
            <InfoValue>{format(new Date(plant.nextWateringAt), 'MMM d, yyyy')}</InfoValue>
          </InfoRow>
        </Section>

        <WaterButton onPress={handleWater} activeOpacity={0.8}>
          <WaterButtonText>{t('plants.detail.markAsWatered')}</WaterButtonText>
        </WaterButton>

        <DeleteButton onPress={handleDelete} activeOpacity={0.8}>
          <DeleteButtonText>{t('plants.detail.delete')}</DeleteButtonText>
        </DeleteButton>
      </Content>
    </Container>
  );
};
