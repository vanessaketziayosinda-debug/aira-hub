<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>My Requirements - AIRA HUB</title>

    @vite([
        'resources/css/app.css',
        'resources/js/baru/MyRequirements.jsx'
    ])
</head>

<body class="bg-zinc-950">

    <div id="my-requirements-app"></div>

</body>

</html>
