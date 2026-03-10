import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Plant } from '../types';
import { needsWater, getWateringStatus } from '../utils';
import { formatDistanceToNow } from 'date-fns';

interface PlantCardProps {
  plant: Plant;
  onPress: (plant: Plant) => void;
  onWater: (plant: Plant) => void;
}

const CardContainer = styled.TouchableOpacity<{ status: string }>`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
  border-left-width: 4px;
  border-left-color: ${({ theme, status }) => {
    switch (status) {
      case 'overdue': return theme.colors.error;
      case 'today': return theme.colors.warning;
      default: return theme.colors.primary;
    }
  }};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PlantInfo = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const EmojiContainer = styled.View`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const EmojiText = styled.Text`
  font-size: 32px;
`;

const PlantName = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const WateringInfo = styled.Text<{ urgent?: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme, urgent }) => urgent ? theme.colors.error : theme.colors.text.muted};
  margin-top: 2px;
`;

const WaterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
`;

const WaterButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary};
`;

const NeedsWaterBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: 2px 8px;
  margin-top: 4px;
  align-self: flex-start;
`;

const NeedsWaterText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: white;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onPress, onWater }) => {
  const { t } = useTranslation();
  const status = getWateringStatus(plant);
  const urgent = needsWater(plant);

  return (
    <CardContainer status={status} onPress={() => onPress(plant)} activeOpacity={0.8}>
      <Row>
        <EmojiContainer>
          <EmojiText>{plant.emoji}</EmojiText>
        </EmojiContainer>
        <PlantInfo>
          <PlantName>{plant.name}</PlantName>
          {urgent ? (
            <NeedsWaterBadge>
              <NeedsWaterText>{t('plants.card.needsWater')}</NeedsWaterText>
            </NeedsWaterBadge>
          ) : (
            <WateringInfo>
              {t('plants.card.nextWatering')}: {formatDistanceToNow(new Date(plant.nextWateringAt), { addSuffix: true })}
            </WateringInfo>
          )}
        </PlantInfo>
        <WaterButton onPress={() => onWater(plant)} activeOpacity={0.8}>
          <WaterButtonText>💧 {t('plants.card.waterNow')}</WaterButtonText>
        </WaterButton>
      </Row>
    </CardContainer>
  );
};
