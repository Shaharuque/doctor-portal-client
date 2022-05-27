import React from 'react';

const Loading = () => {
    return (
    <div class="flex items-center justify-center mt-12">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
};

export default Loading;