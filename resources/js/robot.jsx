import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import { createRoot } from "react-dom/client";

import {
    Canvas,
    useFrame,
} from "@react-three/fiber";

import {
    Float,
} from "@react-three/drei";

import * as THREE from "three";

/*
|--------------------------------------------------------------------------
| TARGET
|--------------------------------------------------------------------------
*/

const targets = [
    {
        id: "feature-ai",
        title: "AIRA AI",
        description:
            "Gunakan AI untuk membantu chat, writing, coding, image, dan kebutuhan digital lainnya.",
    },

    {
        id: "feature-jobs",
        title: "AIRA JOBS",
        description:
            "Temukan peluang kerja atau hubungkan kemampuanmu dengan orang dan perusahaan yang membutuhkan.",
    },

    {
        id: "feature-career",
        title: "AIRA Career Quest",
        description:
            "Uji mindset dan kemampuan problem solving melalui pengalaman berbasis game.",
    },

    {
        id: "feature-projects",
        title: "Projects",
        description:
            "Bangun, simpan, tampilkan, dan kembangkan project yang kamu kerjakan.",
    },
];


/*
|--------------------------------------------------------------------------
| MATERIAL
|--------------------------------------------------------------------------
*/

const bodyMat =
    new THREE.MeshStandardMaterial({
        color: "#263449",
        metalness: 0.85,
        roughness: 0.28,
    });

const armorMat =
    new THREE.MeshStandardMaterial({
        color: "#334155",
        metalness: 0.9,
        roughness: 0.2,
    });

const blackMat =
    new THREE.MeshStandardMaterial({
        color: "#05070b",
        metalness: 0.7,
        roughness: 0.3,
    });

const blueMat =
    new THREE.MeshStandardMaterial({
        color: "#2563eb",
        emissive: "#2563eb",
        emissiveIntensity: 2.8,
        metalness: 0.5,
        roughness: 0.15,
    });

const whiteMat =
    new THREE.MeshStandardMaterial({
        color: "#e5e7eb",
        emissive: "#93c5fd",
        emissiveIntensity: 0.5,
        metalness: 0.5,
        roughness: 0.2,
    });


/*
|--------------------------------------------------------------------------
| ARM
|--------------------------------------------------------------------------
|
| Arm hierarchy:
|
| shoulder
|    ↓
| upper arm
|    ↓
| elbow
|    ↓
| forearm
|    ↓
| hand
|
*/

function RobotArm({
    armRef,
    side = "right",
}) {
    const x =
        side === "right"
            ? 0.82
            : -0.82;

    return (
        <group
            ref={armRef}
            position={[
                x,
                0.72,
                0.05,
            ]}
        >
            {/* SHOULDER */}
            <mesh material={armorMat}>
                <sphereGeometry
                    args={[
                        0.22,
                        18,
                        18,
                    ]}
                />
            </mesh>

            {/* SATU BATANG LURUS */}
            <mesh
                position={[
                    0,
                    -0.68,
                    0,
                ]}
                material={armorMat}
            >
                <boxGeometry
                    args={[
                        0.27,
                        1.36,
                        0.30,
                    ]}
                />
            </mesh>

            {/* HAND */}
            <group
                position={[
                    0,
                    -1.48,
                    0,
                ]}
            >
                <mesh material={whiteMat}>
                    <sphereGeometry
                        args={[
                            0.18,
                            18,
                            18,
                        ]}
                    />
                </mesh>

                <mesh
                    position={[
                        0,
                        -0.13,
                        0.10,
                    ]}
                    material={blueMat}
                >
                    <sphereGeometry
                        args={[
                            0.045,
                            12,
                            12,
                        ]}
                    />
                </mesh>
            </group>
        </group>
    );
}


/*
|--------------------------------------------------------------------------
| ROBOT
|--------------------------------------------------------------------------
*/


function Robot({
    mouse,
    targetPosition,
}) {

    const robot =
        useRef();

    const head =
        useRef();

    const rightArm =
        useRef();

    useFrame(
        (state) => {

            if (!robot.current)
                return;


            const time =
                state.clock.getElapsedTime();


            /*
            |--------------------------------------------------------------------------
            | FLOAT
            |--------------------------------------------------------------------------
            */

            robot.current.position.y =
                Math.sin(
                    time * 1.2
                ) * 0.10;


            /*
            |--------------------------------------------------------------------------
            | BODY
            |--------------------------------------------------------------------------
            */

            robot.current.rotation.y =
                THREE.MathUtils.lerp(
                    robot.current.rotation.y,
                    mouse.current.x * 0.12,
                    0.05
                );


            /*
            |--------------------------------------------------------------------------
            | HEAD
            |--------------------------------------------------------------------------
            */

            if (head.current) {

                head.current.rotation.y =
                    THREE.MathUtils.lerp(
                        head.current.rotation.y,
                        mouse.current.x * 0.28,
                        0.08
                    );

                head.current.rotation.x =
                    THREE.MathUtils.lerp(
                        head.current.rotation.x,
                        -mouse.current.y * 0.12,
                        0.08
                    );

            }


            /*
            |--------------------------------------------------------------------------
            | RIGHT ARM
            |--------------------------------------------------------------------------
            |
            | Kita membuat arm menunjuk
            | ke posisi target secara halus.
            |
            */

            /*
             * RIGHT ARM ANIMATION
             *
             * Arm bergerak sebagai satu unit.
             * Ada gerakan dasar (idle) supaya animasi tetap
             * terlihat walaupun target belum tersedia.
             *
             * Saat target tersedia, arm diarahkan secara halus
             * ke target menggunakan rotation Z.
             */
            if (rightArm.current) {
                const dx =
                    targetPosition.x -
                    rightArm.current.position.x;

                const dy =
                    targetPosition.y -
                    rightArm.current.position.y;

                const targetRotation =
                    Math.atan2(
                        dy,
                        dx
                    ) + Math.PI / 2;

                /*
                 * Gerakan menunjuk dibuat periodik.
                 * Saat masuk ke target baru, tangan bergerak
                 * sedikit lebih aktif lalu kembali mengikuti target.
                 */
                const pointMotion =
                    Math.sin(time * 2.2) * 0.10;

                const desiredRotation =
                    targetRotation + pointMotion;

                rightArm.current.rotation.z =
                    THREE.MathUtils.lerp(
                        rightArm.current.rotation.z,
                        desiredRotation,
                        0.12
                    );

                rightArm.current.rotation.x = 0;
                rightArm.current.rotation.y = 0;

                /*
                 * Sedikit gerakan naik-turun pada bahu agar
                 * tangan tidak terlihat seperti benda mati.
                 */
                const idleY =
                    0.72 +
                    Math.sin(time * 2.2) * 0.025;

                rightArm.current.position.y =
                    THREE.MathUtils.lerp(
                        rightArm.current.position.y,
                        idleY,
                        0.12
                    );
            }

        }
    );


    return (

        <group
            ref={robot}
        >

            {/* =====================================================
                BODY
            ===================================================== */}

            <mesh
                position={[
                    0,
                    0.20,
                    0,
                ]}
                material={bodyMat}
            >

                <boxGeometry
                    args={[
                        1.35,
                        1.65,
                        0.80,
                    ]}
                />

            </mesh>


            {/* CHEST */}

            <mesh
                position={[
                    0,
                    0.35,
                    0.43,
                ]}
                material={armorMat}
            >

                <boxGeometry
                    args={[
                        1.05,
                        0.72,
                        0.12,
                    ]}
                />

            </mesh>


            {/* CHEST LIGHT */}

            <mesh
                position={[
                    0,
                    0.35,
                    0.51,
                ]}
                material={blueMat}
            >

                <boxGeometry
                    args={[
                        0.45,
                        0.12,
                        0.04,
                    ]}
                />

            </mesh>


            {/* NECK */}

            <mesh
                position={[
                    0,
                    1.10,
                    0,
                ]}
                material={blackMat}
            >

                <cylinderGeometry
                    args={[
                        0.22,
                        0.22,
                        0.24,
                        16,
                    ]}
                />

            </mesh>


            {/* =====================================================
                HEAD
            ===================================================== */}

            <group
                ref={head}
                position={[
                    0,
                    1.48,
                    0,
                ]}
            >

                <mesh
                    material={armorMat}
                >

                    <boxGeometry
                        args={[
                            1.05,
                            0.78,
                            0.85,
                        ]}
                    />

                </mesh>


                {/* FACE */}

                <mesh
                    position={[
                        0,
                        -0.02,
                        0.43,
                    ]}
                    material={blackMat}
                >

                    <boxGeometry
                        args={[
                            0.78,
                            0.34,
                            0.08,
                        ]}
                    />

                </mesh>


                {/* LEFT EYE */}

                <mesh
                    position={[
                        -0.20,
                        -0.02,
                        0.49,
                    ]}
                    material={blueMat}
                >

                    <boxGeometry
                        args={[
                            0.13,
                            0.07,
                            0.03,
                        ]}
                    />

                </mesh>


                {/* RIGHT EYE */}

                <mesh
                    position={[
                        0.20,
                        -0.02,
                        0.49,
                    ]}
                    material={blueMat}
                >

                    <boxGeometry
                        args={[
                            0.13,
                            0.07,
                            0.03,
                        ]}
                    />

                </mesh>


                {/* HEAD LIGHT */}

                <mesh
                    position={[
                        0,
                        0.36,
                        0,
                    ]}
                    material={blueMat}
                >

                    <boxGeometry
                        args={[
                            0.28,
                            0.06,
                            0.05,
                        ]}
                    />

                </mesh>

            </group>


            {/* =====================================================
                RIGHT ARM
            ===================================================== */}

            <RobotArm
                armRef={
                    rightArm
                }
            />


            {/* =====================================================
                LEFT ARM — LURUS / RELAXED
            ===================================================== */}

            <RobotArm
                side="left"
            />

            {/* =====================================================
                WAIST
            ===================================================== */}

            <mesh
                position={[
                    0,
                    -0.72,
                    0,
                ]}
                material={blackMat}
            >

                <boxGeometry
                    args={[
                        0.80,
                        0.25,
                        0.55,
                    ]}
                />

            </mesh>


            {/* =====================================================
                LEGS
            ===================================================== */}

            <mesh
                position={[
                    0.35,
                    -1.30,
                    0,
                ]}
                material={armorMat}
            >

                <boxGeometry
                    args={[
                        0.42,
                        0.95,
                        0.45,
                    ]}
                />

            </mesh>


            <mesh
                position={[
                    -0.35,
                    -1.30,
                    0,
                ]}
                material={armorMat}
            >

                <boxGeometry
                    args={[
                        0.42,
                        0.95,
                        0.45,
                    ]}
                />

            </mesh>


            {/* FEET */}

            <mesh
                position={[
                    0.35,
                    -1.82,
                    0.08,
                ]}
                material={blackMat}
            >

                <boxGeometry
                    args={[
                        0.52,
                        0.22,
                        0.75,
                    ]}
                />

            </mesh>


            <mesh
                position={[
                    -0.35,
                    -1.82,
                    0.08,
                ]}
                material={blackMat}
            >

                <boxGeometry
                    args={[
                        0.52,
                        0.22,
                        0.75,
                    ]}
                />

            </mesh>


            {/* SHOULDER LIGHT */}

            <mesh
                position={[
                    0.78,
                    0.86,
                    0.18,
                ]}
                material={blueMat}
            >

                <sphereGeometry
                    args={[
                        0.08,
                        12,
                        12,
                    ]}
                />

            </mesh>


            <mesh
                position={[
                    -0.78,
                    0.86,
                    0.18,
                ]}
                material={blueMat}
            >

                <sphereGeometry
                    args={[
                        0.08,
                        12,
                        12,
                    ]}
                />

            </mesh>

        </group>
    );
}


/*
|--------------------------------------------------------------------------
| HOLOGRAM BASE
|--------------------------------------------------------------------------
*/

function Hologram() {

    const ring1 =
        useRef();

    const ring2 =
        useRef();

    useFrame(
        (state) => {

            const time =
                state.clock.getElapsedTime();

            if (ring1.current) {

                ring1.current.rotation.z =
                    time * 0.5;

            }

            if (ring2.current) {

                ring2.current.rotation.z =
                    -time * 0.35;

            }

        }
    );

    return (

        <group
            position={[
                0,
                -1.98,
                0,
            ]}
        >

            <mesh
                ref={ring1}
                rotation-x={
                    Math.PI / 2
                }
            >

                <torusGeometry
                    args={[
                        1.35,
                        0.025,
                        16,
                        80,
                    ]}
                />

                <meshBasicMaterial
                    color="#2563eb"
                    transparent
                    opacity={0.8}
                />

            </mesh>


            <mesh
                ref={ring2}
                rotation-x={
                    Math.PI / 2
                }
            >

                <torusGeometry
                    args={[
                        1.7,
                        0.015,
                        16,
                        80,
                    ]}
                />

                <meshBasicMaterial
                    color="#60a5fa"
                    transparent
                    opacity={0.45}
                />

            </mesh>

        </group>
    );
}


/*
|--------------------------------------------------------------------------
| GUIDE
|--------------------------------------------------------------------------
*/

function GuideMessage({
    activeIndex,
}) {

    const target =
        targets[activeIndex];

    return (

        <div
            className="
                absolute
                left-6
                bottom-6
                max-w-sm
                rounded-2xl
                border
                border-indigo-400/30
                bg-zinc-950/80
                backdrop-blur-xl
                px-5
                py-4
                shadow-2xl
            "
        >

            <div
                className="
                    mb-2
                    flex
                    items-center
                    gap-2
                "
            >

                <div
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-blue-400
                        shadow-[0_0_15px_rgba(59,130,246,1)]
                    "
                />

                <span
                    className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-blue-300
                    "
                >
                    AIRA • Guide
                </span>

            </div>


            <h3
                className="
                    text-lg
                    font-bold
                    text-white
                "
            >
                {target.title}
            </h3>


            <p
                className="
                    mt-1
                    text-sm
                    leading-relaxed
                    text-zinc-400
                "
            >
                {target.description}
            </p>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| CARD EFFECT
|--------------------------------------------------------------------------
*/

let movingOrb = null;

function ensureMovingOrb() {
    if (movingOrb) {
        return movingOrb;
    }

    movingOrb =
        document.createElement(
            "div"
        );

    movingOrb.className =
        "aira-moving-orb";

    movingOrb.innerHTML = `
        <div class="aira-orb-ring"></div>
        <div class="aira-orb-ring aira-orb-ring-2"></div>

        <div class="aira-orb-core">
            <div class="aira-orb-light"></div>
        </div>
    `;

    document.body.appendChild(
        movingOrb
    );

    return movingOrb;
}

function updateActiveCard(
    activeIndex
) {
    document
        .querySelectorAll(
            ".aira-feature-card"
        )
        .forEach(
            (card) => {
                card.classList.remove(
                    "aira-active"
                );
            }
        );

    const target =
        document.getElementById(
            targets[
                activeIndex
            ].id
        );

    if (target) {
        target.classList.add(
            "aira-active"
        );
    }

    return target;
}

function moveOrbToTarget(
    target
) {
    if (!target) {
        return;
    }

    const orb =
        ensureMovingOrb();

    const rect =
        target.getBoundingClientRect();

    orb.style.left =
        `${
            rect.left +
            rect.width / 2
        }px`;

    orb.style.top =
        `${
            rect.top +
            rect.height / 2
        }px`;
}


/*
|--------------------------------------------------------------------------
| GET TARGET POSITION
|--------------------------------------------------------------------------
*/

function getTargetPosition(
    target
) {
    if (!target)
        return {
            x: 0,
            y: 0,
        };

    const rect =
        target.getBoundingClientRect();

    const robotContainer =
        document.getElementById(
            "aira-robot"
        );

    if (!robotContainer)
        return {
            x: 0,
            y: 0,
        };

    const containerRect =
        robotContainer.getBoundingClientRect();

    const centerX =
        rect.left +
        rect.width / 2;

    const centerY =
        rect.top +
        rect.height / 2;

    const normalizedX =
        (
            centerX -
            containerRect.left
        ) /
        containerRect.width *
        2 -
        1;

    const normalizedY =
        -(
            (
                centerY -
                containerRect.top
            ) /
            containerRect.height *
            2 -
            1
        );

    return {
        x:
            normalizedX *
            2.8,

        y:
            normalizedY *
            2.8,
    };
}


/*
|--------------------------------------------------------------------------
| SCENE
|--------------------------------------------------------------------------
*/

function RobotScene() {

    const [
        activeIndex,
        setActiveIndex,
    ] = useState(0);


    const mouse =
        useRef({
            x: 0,
            y: 0,
        });


    const [
        targetPosition,
        setTargetPosition,
    ] = useState({
        x: 0,
        y: 0,
    });


    /*
    |--------------------------------------------------------------------------
    | MOUSE
    |--------------------------------------------------------------------------
    */

    useEffect(
        () => {

            const handleMouseMove =
                (event) => {

                    mouse.current.x =
                        (
                            event.clientX /
                            window.innerWidth
                        ) *
                        2 -
                        1;

                    mouse.current.y =
                        (
                            event.clientY /
                            window.innerHeight
                        ) *
                        2 -
                        1;

                };


            window.addEventListener(
                "mousemove",
                handleMouseMove
            );


            return () => {

                window.removeEventListener(
                    "mousemove",
                    handleMouseMove
                );

            };

        },
        []
    );


    /*
    |--------------------------------------------------------------------------
    | AUTO TOUR — 4.5 DETIK
    |--------------------------------------------------------------------------
    */
    useEffect(
        () => {
            const target =
                updateActiveCard(
                    activeIndex
                );

            requestAnimationFrame(
                () => {
                    moveOrbToTarget(
                        target
                    );

                    setTargetPosition(
                        getTargetPosition(
                            target
                        )
                    );
                }
            );

            const timer =
                setTimeout(
                    () => {
                        setActiveIndex(
                            (
                                previous
                            ) =>
                                (
                                    previous +
                                    1
                                ) %
                                targets.length
                        );
                    },
                    4500
                );

            return () =>
                clearTimeout(
                    timer
                );
        },
        [
            activeIndex,
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | ORB SAAT RESIZE / SCROLL
    |--------------------------------------------------------------------------
    */
    useEffect(
        () => {
            const update =
                () => {
                    const target =
                        document.getElementById(
                            targets[
                                activeIndex
                            ].id
                        );

                    if (!target)
                        return;

                    moveOrbToTarget(
                        target
                    );

                    setTargetPosition(
                        getTargetPosition(
                            target
                        )
                    );
                };

            window.addEventListener(
                "resize",
                update
            );

            window.addEventListener(
                "scroll",
                update,
                {
                    passive: true,
                }
            );

            update();

            return () => {
                window.removeEventListener(
                    "resize",
                    update
                );

                window.removeEventListener(
                    "scroll",
                    update
                );
            };
        },
        [
            activeIndex,
        ]
    );


    return (

        <div
            className="
                relative
                h-full
                w-full
                overflow-visible
            "
        >

            <Canvas
                camera={{
                    position: [
                        0,
                        0.30,
                        7.2,
                    ],

                    fov: 45,
                }}

                gl={{
                    antialias: true,
                    alpha: false,
                }}
            >

                <color
                    attach="background"
                    args={[
                        "#070b14",
                    ]}
                />


                <ambientLight
                    intensity={1.4}
                />


                <directionalLight
                    position={[
                        4,
                        5,
                        5,
                    ]}
                    intensity={2}
                />


                <pointLight
                    position={[
                        0,
                        1,
                        3,
                    ]}
                    intensity={5}
                    distance={8}
                />


                <Float
                    speed={1.5}
                    rotationIntensity={0.12}
                    floatIntensity={0.30}
                >

                    <Robot
                        mouse={mouse}
                        targetPosition={
                            targetPosition
                        }
                    />


                    <Hologram />

                </Float>

            </Canvas>


            <GuideMessage
                activeIndex={
                    activeIndex
                }
            />

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| CSS
|--------------------------------------------------------------------------
*/

const style =
    document.createElement(
        "style"
    );


style.innerHTML = `

.aira-feature-card {

    position: relative;

    overflow: hidden;

    transform:
        translateY(0)
        scale(1);

    transition:
        transform .8s
            cubic-bezier(.2,.8,.2,1),

        box-shadow .8s ease,

        border-color .8s ease;

}


.aira-feature-card.aira-active {

    transform:
        translateY(-10px)
        scale(1.03);

    border-color:
        rgba(99,102,241,.95);

    box-shadow:

        0 0 0 1px
        rgba(99,102,241,.25),

        0 0 35px
        rgba(59,130,246,.25),

        0 20px 60px
        rgba(0,0,0,.35);

    animation:
        airaTargetFloat
        2.2s
        ease-in-out
        infinite;

}


@keyframes airaTargetFloat {

    0% {

        transform:
            translateY(-8px)
            scale(1.025);

    }

    50% {

        transform:
            translateY(-15px)
            scale(1.04);

    }

    100% {

        transform:
            translateY(-8px)
            scale(1.025);

    }

}


/* ==========================================================
   SATU ORB — BERGERAK CARD KE CARD
========================================================== */

.aira-moving-orb {
    position: fixed;

    left: 0;
    top: 0;

    width: 64px;
    height: 64px;

    transform:
        translate(-50%, -50%);

    pointer-events: none;

    z-index: 99999;

    transition:
        left 1.15s
            cubic-bezier(.22,1,.36,1),
        top 1.15s
            cubic-bezier(.22,1,.36,1);

    filter:
        drop-shadow(
            0 0 18px
            rgba(59,130,246,.75)
        );
}

.aira-orb-core {
    position: absolute;

    left: 50%;
    top: 50%;

    width: 20px;
    height: 20px;

    transform:
        translate(-50%, -50%);

    border-radius: 999px;

    background:
        radial-gradient(
            circle,
            #ffffff 0%,
            #93c5fd 25%,
            #3b82f6 55%,
            #1d4ed8 100%
        );

    box-shadow:
        0 0 12px
        rgba(96,165,250,1),

        0 0 30px
        rgba(59,130,246,.9),

        0 0 60px
        rgba(37,99,235,.6);

    animation:
        airaOrbFloat
        1.8s
        ease-in-out
        infinite;
}

.aira-orb-light {
    position: absolute;

    left: 50%;
    top: 50%;

    width: 6px;
    height: 6px;

    transform:
        translate(-50%, -50%);

    border-radius: 999px;

    background: white;

    box-shadow:
        0 0 10px white;
}

.aira-orb-ring {
    position: absolute;

    left: 50%;
    top: 50%;

    width: 44px;
    height: 44px;

    transform:
        translate(-50%, -50%);

    border:
        1px solid
        rgba(96,165,250,.75);

    border-radius: 999px;

    animation:
        airaOrbRotate
        2.5s
        linear
        infinite;
}

.aira-orb-ring-2 {
    width: 58px;
    height: 58px;

    border-color:
        rgba(59,130,246,.3);

    animation:
        airaOrbPulse
        2s
        ease-in-out
        infinite;
}


/* ==========================================================
   ANIMATION
========================================================== */

@keyframes airaOrbFloat {

    0%,
    100% {

        transform:
            translate(-50%, -53%)
            scale(1);

    }

    50% {

        transform:
            translate(-50%, -47%)
            scale(1.12);

    }

}


@keyframes airaOrbRotate {

    from {

        transform:
            translate(-50%, -50%)
            rotate(0deg);

    }

    to {

        transform:
            translate(-50%, -50%)
            rotate(360deg);

    }

}


@keyframes airaOrbPulse {

    0%,
    100% {

        opacity: .25;

        transform:
            translate(-50%, -50%)
            scale(.8);

    }

    50% {

        opacity: .8;

        transform:
            translate(-50%, -50%)
            scale(1.15);

    }

}

`;


document.head.appendChild(
    style
);


/*
|--------------------------------------------------------------------------
| MOUNT
|--------------------------------------------------------------------------
*/

const rootElement =
    document.getElementById(
        "aira-robot"
    );


if (rootElement) {

    createRoot(
        rootElement
    ).render(
        <RobotScene />
    );

}
