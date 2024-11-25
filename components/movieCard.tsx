import React, { memo } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { IMovie } from '../types/IMovie';

interface MovieCardProps {
  movie: IMovie;
  onPress?: (id: number) => void;
  styles: {
    posterWidth: number;
    posterHeight: number;
    spacing: number;
  };
  showTitle?: boolean;

}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress, styles, showTitle = true }) => {
  const imageUri = movie.imageModel?.url || movie.poster;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(Number(movie.id) || 0)}
      style={{
        width: styles.posterWidth,
        marginRight: styles.spacing
      }}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          width: styles.posterWidth,
          height: styles.posterHeight,
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
      {showTitle && (
        <Text
          className="text-white font-semibold text-base"
          style={{
            textAlign: 'center',
            marginTop: 2
          }}
          numberOfLines={1}
        >
          {movie.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(MovieCard);
