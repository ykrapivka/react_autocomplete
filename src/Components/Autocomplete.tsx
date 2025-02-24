import { useState } from 'react';
import { Person } from '../types/Person';
import debounce from 'lodash.debounce';

type Props = {
  delay?: number;
  people: Person[];
  query: string;
  onSelected: (person: Person) => void;
  onError: (boolean: boolean) => void;
};

export const Autocomplete: React.FC<Props> = ({
  delay = 300,
  people,
  query,
  onSelected,
  onError,
}) => {
  const [appliedQuery, setAppliedQuery] = useState(query);
  const applyQuery = debounce(setAppliedQuery, delay);

  applyQuery(query);
  const filteredPeople = [...people].filter(person =>
    person.name.includes(appliedQuery),
  );

  if (filteredPeople.length < 1) {
    onError(true);
  } else {
    onError(false);
  }

  return (
    <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
      <div className="dropdown-content">
        <div className="dropdown-item" data-cy="suggestion-item">
          {filteredPeople.map((person: Person) => (
            <p
              className="has-text-link"
              key={person.name}
              onMouseDown={() => onSelected(person)}
              style={{ pointerEvents: 'auto' }}
            >
              {person.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
