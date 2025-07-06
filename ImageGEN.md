# Basic prompt, save to file
curl -o sunset.jpg "https://image.pollinations.ai/prompt/A%20beautiful%20sunset%20over%20the%20ocean"

# With parameters
curl -o sunset_large.jpg "https://image.pollinations.ai/prompt/A%20beautiful%20sunset%20over%20the%20ocean?width=1280&height=720&seed=42&model=flux"

# With transparent background (gptimage model only)
curl -o logo_transparent.png "https://image.pollinations.ai/prompt/A%20company%20logo%20on%20transparent%20background?model=gptimage&transparent=true"

# Image-to-image generation with kontext model
curl -o logo_cake.png "https://image.pollinations.ai/prompt/bake_a_cake_from_this_logo?model=kontext&image=https://avatars.githubusercontent.com/u/86964862"